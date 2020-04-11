const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        docTitle : 'Add a Product', 
        path: 'admin/add-product', 
        formsCSS: true,
        productCSS: true
    });
};

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title);
    product.save()
    res.redirect('/');
};

exports.editProduct = (req, res, next) => {
    res.redirect('');
};
exports.getAdminProductList = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('products', {
            prods: products, 
            docTitle: 'All Products', 
            path: 'admin/products', 
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    });
};