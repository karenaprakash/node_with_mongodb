const {getDb} = require('../utils/database');
const ObjectID = require('mongodb').ObjectID;


class Product{
    constructor(name,price,description,imageUrl,userId){
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.userId = userId;
    }

    save(){
        const db = getDb();
        return   db.collection('products')
        .insertOne(this)
        .then(result => console.log(result))
        .catch(err => Console.log(err));
    }

    static fetchAll(){
        const db = getDb();
        return db.collection('products')
                .find()
                .toArray()
                .then(products => {
                    //console.log(products)
                    return products;
                })
                .catch(err => console.log(err));
    }

    static findById(id){
        const db = getDb();
        return db.collection('products')
                .findOne({ _id :  ObjectID(id) } )
                .then(product => {
                    //console.log(product)
                    return product;
                })
                .catch(err => console.log(err));
        }

    static findOneAndDelete(id){
        const db = getDb();
        return db.collection('products')
                .findOneAndDelete( { _id :  ObjectID(id) })
                .then(product => {
                  //  console.log(product)
                    return product;
                })
                .catch(err => console.log(err));
    }

    static findByIdAndUpdate(id , data ){
        const db = getDb();
        return db.collection('products')
                .findOneAndUpdate( { _id : ObjectID(id) } , { $set : data })
                .then(product => {
                   // console.log(product)
                    return product;
                })
                .catch(err => console.log(err));
    }
 }

module.exports  = Product;

