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
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageURL, price, description);
    product.save()
    res.redirect('/shop/products-list');
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