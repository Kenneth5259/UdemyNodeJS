const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
        'data', 
        'cart.json'
    );


module.exports = class Cart {
    static addProduct(id, productPrice) {
        //fetch product
        fs.readFile(p, (error, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!error) {
                cart = JSON.parse(fileContent);
            }
            
            //analyze cart, check if exists
            const existingProductIndex = cart.products.findIndex(prod => prod.id == id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            
            //add new object to cart or increment quantity
            if(existingProduct) {
                updatedProduct = {...existingProduct};
                updatedProduct.quantity = updatedProduct.quantity + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {
                    id: id,
                    quantity: 1
                };
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        });
        
    }
    static deleteProduct(id, productPrice) {
        fs.readFile(p, (error, fileContent) => {
            if(error) {
                return;
            }
            let cart = JSON.parse(fileContent);
            const updatedCart = {...cart};
            const product = updatedCart.products.find(prod => prod.id ===id);
            const productQty = product ? product.quantity : 0;
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            })
        });
    }
    static getCart(cb) {
        fs.readFile(p, (error, fileContent) => { 
            if(error) {
                cb(null);
            } else {
                const cart = JSON.parse(fileContent);
                cb(cart);
            }
            
       });
    }

}