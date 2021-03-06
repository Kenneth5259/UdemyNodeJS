const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);
router.get('/shop/products-list', shopController.getProducts);
router.get('/shop/cart', shopController.getCart);
router.post('/shop/cart', shopController.postCart);
router.post('/shop/cart-delete-item', shopController.postDeleteCartItem)
router.get('/shop/checkout', shopController.getCheckout);
router.get('/shop/orders', shopController.getOrders);
router.get('/shop/products/:productId', shopController.getProductDetails);

module.exports = router;
