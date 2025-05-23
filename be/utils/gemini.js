const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeMessageWithAI = async (message, products = []) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });

  // Biến danh sách sản phẩm thành mô tả text
  const productListText = products.map((p, i) =>
    `${i + 1}. ${p.name} | Màu: ${p.color} | Giá: ₫${p.price} | Link: ${p.url}`
  ).join("\n");

  const prompt = `
Bạn là nhân viên tư vấn bán giày. Dưới đây là danh sách sản phẩm hiện có:

${productListText}

Người dùng vừa nói: "${message}"

Nếu người dùng chỉ đang chào hỏi, trả về:
{
  "intent": "chat",
  "response": "Chào bạn! Shop có thể giúp gì hôm nay?"
}

Nếu người dùng có ý định mua sản phẩm, hãy chọn 1 sản phẩm phù hợp nhất từ danh sách trên.
Trả về JSON như sau:

{
  "intent": "product_search",
  "response": "Gợi ý chi tiết bằng tiếng Việt",
  "product": {
    "name": "...",
    "color": "...",
    "price": ...,
    "url": "..."
  }
}

Chỉ trả JSON, không thêm giải thích bên ngoài.
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  try {
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}") + 1;
    const jsonString = text.substring(jsonStart, jsonEnd);
    return JSON.parse(jsonString);
  } catch (err) {
    throw new Error("Gemini response parsing failed: " + text);
  }
};

module.exports = { analyzeMessageWithAI };
