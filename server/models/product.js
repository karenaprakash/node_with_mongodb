const fs = require('fs');
const path = require('path');
const p = path.join(__dirname,'../data','products.json');
const Cart = require('../models/cart');

const GetProductsFromFile = callback => {
    fs.readFile(p,(err,fileContent) => {
        if(err){
            callback([]);
        }
        callback(JSON.parse(fileContent));
    });
}


module.exports = class Product{
    constructor(id,name,imageUrl,price,description){
        this.id = id;
        this.name = name;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
      
            GetProductsFromFile( products => {
                if(this.id){
                    const existingProductIndex = products.findIndex(
                        product => product.id === this.id
                    )
                    const updatedProducts = [...products];
                    updatedProducts[existingProductIndex] = this;
                    fs.writeFile(p,JSON.stringify(updatedProducts),(err)=>{
                        console.log(err)
                    });
                }else{
                    this.id = Math.random().toString();
                    products.push(this)
                    fs.writeFile(p,JSON.stringify(products),(err)=>{
                        console.log(err)
                    });
                }
                
            })
     
    }

    //we can directly call static methods from the class itself,we need not to create object for it 
    static fetchAll(callback) {
        GetProductsFromFile(callback);
    }

    static findById(id,callback){
        GetProductsFromFile( products => {
            const product = products.find(product => product.id === id )
            callback(product);
        });
    }

    static deleteProductById(id,productPrice){
        GetProductsFromFile( products => {
            const updatedProducts = products.filter(product => product.id !== id )
            fs.writeFile(p,JSON.stringify(updatedProducts), err => {
                if(!err){
                    //remove product from cart as well 
                    Cart.deleteProduct(id,productPrice);

                }
            })
        });
    }
}