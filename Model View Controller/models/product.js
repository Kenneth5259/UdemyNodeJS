const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename),
        'data', 
        'products.json'
    );

const getProductsFromFile = (cb) => {
    
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            return cb([]);
        }
        return cb(JSON.parse(fileContent));
    });
};


let products = [];
module.exports = class Product {
   constructor(title, imageURL, price, description) {
        this.title=title;
        this.imageURL=imageURL;
        this.price=price;
        this.description=description;
   } 
   save() {
       this.id = Math.random().toString();
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                if(err) {
                    console.log(err);
                }
            });
        });

   }

    static fetchAll(cb) {
        getProductsFromFile(cb);
   }

   static findById(id, cb) {
    getProductsFromFile(products => {
        const product = products.find(p => p.id === id);
        cb(product);
    });
   }
};