const Product = require("../models/Product");
const { analyzeMessageWithAI } = require("../utils/gemini");
const BASE_URL = process.env.FRONTEND_BASE_URL;

const handleChatRequest = async (req, res) => {
  const { message } = req.body;

  try {
    const allProducts = await Product.find();

    // Gắn URL vào từng sản phẩm
    const productListWithUrls = allProducts.map((p) => ({
      name: p.name,
      color: p.color,
      price: p.price,
      url: `${BASE_URL}/${p._id}`
    }));

    const intentResult = await analyzeMessageWithAI(message, productListWithUrls);
    const { intent, response, product } = intentResult;

    // Nếu chỉ trò chuyện
    if (intent === "chat") {
      return res.json({ response });
    }

    // Nếu AI chọn sản phẩm
    if (intent === "product_search" && product) {
      return res.json({
        response: `${response}\n🔗 Xem tại: ${product.url}`,
        product
      });
    }

    // Trường hợp không khớp gì cả
    return res.json({ response: "Hiện tại chưa có gợi ý phù hợp." });

  } catch (err) {
    console.error("❌ Lỗi chatbot:", err);
    return res.status(500).json({ error: "Lỗi xử lý chatbot." });
  }
};

module.exports = { handleChatRequest };
