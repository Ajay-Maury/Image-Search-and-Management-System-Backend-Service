const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../utils/upload');
const imageController = require('../controllers/imageController');

const router = express.Router();

router
  .route('/image/upload')
  .post(authMiddleware.authenticate, upload.single('image'), imageController.uploadImage);

router
  .route('/image/search')
  .get(authMiddleware.authenticate, imageController.searchImages);

module.exports = router;
