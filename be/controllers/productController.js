const Product = require('../models/Product');  // Import model Product

// Thêm sản phẩm mới
exports.createProduct = async (req, res) => {
  try {
    const { name, brand, size, color, price, description, image, stock } = req.body;

    // Kiểm tra nếu các trường bắt buộc không được cung cấp
    if (!name || !brand || !size || !color || !price || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Tạo một sản phẩm mới
    const newProduct = new Product({
      name,
      brand,
      size,
      color,
      price,
      description,
      image,
      stock,
    });

    // Lưu sản phẩm vào cơ sở dữ liệu
    await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully!',
      product: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error creating product',
      error: err.message,
    });
  }
};

// Lấy tất cả sản phẩm
exports.getAllProducts = async (req, res) => {
  try {
    // Lấy tất cả sản phẩm
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching products',
      error: err.message,
    });
  }
};

// Lấy sản phẩm theo ID
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    // Kiểm tra xem sản phẩm có tồn tại hay không
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching product',
      error: err.message,
    });
  }
};

// Xoá sản phẩm theo ID
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    // Kiểm tra xem sản phẩm có tồn tại hay không trước khi xoá
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({
      message: 'Error deleting product',
      error: err.message,
    });
  }
};

// Lấy tất cả sản phẩm theo brand
exports.getProductsByBrand = async (req, res) => {
    try {
      const { brand } = req.params;  // Lấy brand từ URL
      const products = await Product.find({ brand: brand }); // Lọc theo brand
      res.status(200).json(products);  // Trả về danh sách sản phẩm
    } catch (err) {
      res.status(500).json({
        message: 'Error fetching products by brand',
        error: err.message,
      });
    }
  };
  
