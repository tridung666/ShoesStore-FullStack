const Product = require('../models/Product');

// Tạo sản phẩm mới (image là URL upload trên Cloudinary)
exports.createProduct = async (req, res) => {
  try {
    let { name, brand, size, color, price, description, image, stock } = req.body;

    if (!name || !brand || !size || !color || !price || !description || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Nếu size, color là chuỗi dấu phẩy thì chuyển thành mảng
    if (typeof size === 'string') {
      size = size.split(',').map(s => s.trim());
    }
    if (typeof color === 'string') {
      color = color.split(',').map(c => c.trim());
    }

    price = Number(price);
    stock = Number(stock);

    if (isNaN(price) || isNaN(stock)) {
      return res.status(400).json({ message: "Price and stock must be valid numbers" });
    }

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

    await newProduct.save();

    res.status(201).json({
      message: 'Product created successfully!',
      product: newProduct,
    });
  } catch (err) {
    console.error('Error creating product:', err);
    res.status(500).json({
      message: 'Error creating product',
      error: err.message,
    });
  }
};

// Các hàm khác tương tự, bổ sung log lỗi chi tiết

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({
      message: 'Error fetching products',
      error: err.message,
    });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({
      message: 'Error fetching product',
      error: err.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    let { name, brand, size, color, price, description, image, stock } = req.body;

    if (typeof size === 'string') {
      size = size.split(',').map(s => s.trim());
    }
    if (typeof color === 'string') {
      color = color.split(',').map(c => c.trim());
    }

    price = Number(price);
    stock = Number(stock);

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name, brand, size, color, price, description, image, stock },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully!',
      product: updatedProduct,
    });
  } catch (err) {
    console.error('Error updating product:', err);
    res.status(500).json({
      message: 'Error updating product',
      error: err.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Error deleting product:', err);
    res.status(500).json({
      message: 'Error deleting product',
      error: err.message,
    });
  }
};

exports.getProductsByBrand = async (req, res) => {
  try {
    const { brand } = req.params;
    const products = await Product.find({ brand });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products by brand:', err);
    res.status(500).json({
      message: 'Error fetching products by brand',
      error: err.message,
    });
  }
};
