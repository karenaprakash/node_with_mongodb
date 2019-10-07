const fs = require('fs');
const path = require('path');
const p = path.join(__dirname,'../data','cart.json');


module.exports = class Cart{
    static addProduct( id , productPrice ){
        //Fetch previous product
        fs.readFile(p,(err,fileContent) => {
            let cart = { products : [] , totalPrice : 0 };
            if(!err){
                cart = JSON.parse(fileContent);
            }
            console.log(cart)
            //Analize the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(product => product.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            if(existingProduct){
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = existingProduct.qty + 1;
                cart.products = [ ...cart.products ];
                cart.products[existingProductIndex] = updatedProduct;
            } 
            else{
            //Add New Product / increase product quantity 
                updatedProduct = { id:id , qty : 1 };
                cart.products = [ ...cart.products , updatedProduct ]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            
            fs.writeFile(p,JSON.stringify(cart),err => {
                console.log(err)
            })
      })    
    }

    static deleteProduct( id , productPrice ){
       
        //using id check product is in cart or not 
        fs.readFile(p,(err,fileContent) => {

            if(err){
                return;
            }

            const updatedCart = JSON.parse(fileContent);
            console.log(updatedCart)
            const product = updatedCart.products.find( product => product.id === id );

            if(!product){
                return;
            }

            const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter( product => product.id !== id );
            updatedCart.totalPrice = updatedCart.totalPrice - productPrice * productQty;
             
            fs.writeFile(p,JSON.stringify(updatedCart), err => {
                console.log(err);
            })
            
         
        })
    }

    static getCart(callback){
         fs.readFile(p,(err,fileContent) => {
            if(err){
                callback(null);
            }else{
                const cart = JSON.parse(fileContent);
                callback(cart);
            }
        })
    }
}