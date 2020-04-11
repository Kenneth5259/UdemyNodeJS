const Product = require('../models/product');

exports.getProducts =  (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('products-list', {
            prods: products, 
            docTitle: 'All Products', 
            path: 'shop/products-list', 
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};

exports.getIndex =  (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('index', {
            prods: products, 
            docTitle: 'Shop', 
            path: '/', 
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};


exports.getCart = (req, res, next) => {
    res.render('cart',  {
        path: 'shop/cart', 
        docTitle: 'Your Cart'
    });
};
exports.getCheckout = (req, res, next) => {
    res.render('checkout', {
        path: 'shop/checkout', 
        docTitle: 'Checkout'
    });
};
exports.getProductDetails = (req, res, next) => {
    res.redirect('');
};
