const express = require('express');
const {
  getProducts,
  createProducts,
} = require('../controllers/productController');
const router = express();

router.route('/').get(getProducts).post(createProducts);

module.exports = router;
