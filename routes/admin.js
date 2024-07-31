const express = require('express');
const { getProduct, postProduct } = require('../controllers/products');
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getProduct);

// /admin/add-product => POST
router.post('/add-product', postProduct);

module.exports = router