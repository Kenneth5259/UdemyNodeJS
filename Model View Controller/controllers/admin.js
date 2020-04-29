const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('edit-product', {
        docTitle : 'Add a Product', 
        path: 'admin/add-product', 
        formsCSS: true,
        productCSS: true,
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null, title, imageURL, price, description);
    product.save()
    res.redirect('/shop/products-list');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        if(!product) {
            return res.redirect('/');
        }   
            res.render('edit-product', {
            docTitle : 'Edit Product', 
            path: 'admin/edit-product', 
            formsCSS: true,
            productCSS: true,
            editing: editMode,
            product: product
        });
    })
    
};
exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageURL = req.body.imageURL;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(prodId, title, imageURL, price, description);
    product.save();
    res.redirect('/admin/products');
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

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId);
    res.redirect('/admin/products');
};