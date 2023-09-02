const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../utils/upload');
const imageController = require('../controllers/imageController');

const router = express.Router();

router
  .route('/image/save')
  .post(authMiddleware.authenticate, imageController.SaveImage);

router
  .route('/image/cloudinary-upload')
  .post(authMiddleware.authenticate, upload.single('file'), imageController.uploadImageToCloudinary);

router
  .route('/image/search')
  .post(authMiddleware.authenticate, imageController.searchImages);

router
  .route('/image-by-id/:id')
  .get(authMiddleware.authenticate, imageController.searchImageById);

module.exports = router;
