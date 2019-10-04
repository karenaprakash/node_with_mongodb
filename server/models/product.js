const fs = require('fs');
const mainDir = require('../utils/path');
const path = require('path');
const p = path.join(mainDir,'data','products.json');


const GetProductsFromFile = callback => {
    fs.readFile(p,(err,fileContent) => {
        if(err){
            callback([]);
        }
        callback(JSON.parse(fileContent));
    });
}



module.exports = class Product{
    constructor(t){
        this.title = t
    }

    save() {
      
        fs.readFile(p,() => {
            GetProductsFromFile( products => {
                products.push(this)
                fs.writeFile(p,JSON.stringify(products),(err)=>{
                    console.log(err)
                });
            })
        });
    }

    //we can directly call static methods from the class itself,we need not to create object for it 
    static fetchAll(callback) {
        GetProductsFromFile(callback);
    }
}