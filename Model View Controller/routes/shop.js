const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/shop/products-list', shopController.getProducts);
router.get('/shop/cart', shopController.getCart);
router.get('/shop/checkout', shopController.getCheckout);

module.exports = router;
