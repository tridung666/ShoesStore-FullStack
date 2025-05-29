const express = require('express');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const streamifier = require('streamifier');

const { authenticateUser, authorizeRoles } = require("../middlewares/auth");
const {
  createProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  getProductsByBrand
} = require('../controllers/productController');

const router = express.Router();

// Cấu hình multer để xử lý upload file dạng bộ nhớ (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Cấu hình Cloudinary (bạn cần set các biến môi trường CLOUDINARY_URL hoặc config thủ công)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware upload ảnh lên Cloudinary
// Middleware xử lý lỗi upload cloudinary
const uploadToCloudinary = (req, res, next) => {
  if (!req.file) return next();

  const stream = cloudinary.uploader.upload_stream(
    { folder: 'products' },
    (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error);
        return res.status(500).json({ message: "Upload ảnh thất bại" });
      }
      req.body.image = result.secure_url;
      next();
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(stream);
};


// Route tạo sản phẩm có upload ảnh
router.post(
  '/',
  authenticateUser,
  authorizeRoles('admin'),
  upload.single('image'), // tên field upload là 'image'
  uploadToCloudinary,
  createProduct
);

router.get('/', getAllProducts);
router.get('/brand/:brand', getProductsByBrand);
router.get('/:id', getProductById);
router.delete('/:id', authenticateUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;
