const Product = require('../models/product');
const Cart = require('../models/cart');

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
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const cartProducts = [];
            if(cart) {
                for(product of products) {
                    const cartProductData = cart.products.find(prod => prod.id === product.id);
                    if(cartProductData){
                        cartProducts.push({productData: product, quantity:cartProductData.quantity});
                    }
                }
            }
            res.render('shop/cart',  {
                path: 'shop/cart', 
                docTitle: 'Your Cart',
                products: cartProducts
            }); 
        });
        
    });
    
};

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (products) =>{
        Cart.addProduct(prodId, products.price);
    })
    res.redirect('/shop/cart');
}

exports.getOrders = (req, res, next) => {
    res.render('orders',  {
        path: 'shop/orders', 
        docTitle: 'Your Orders'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('checkout', {
        path: 'shop/checkout', 
        docTitle: 'Checkout'
    });
};

exports.postDeleteCartItem = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
    });
    
    res.redirect('/shop/cart');
};

exports.getProductDetails = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('shop/product-detail', {
            product: product, 
            docTitle: product.title,
            path: 'shop/products-list'
        });
    });
};
