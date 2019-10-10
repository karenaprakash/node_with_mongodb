const {getDb} = require('../utils/database');
const ObjectID = require('mongodb').ObjectID;

class User{
    constructor(username,email,cart,id){
        this.username = username;
        this.email = email;
        this.cart = cart;
        this._id = id;
    }

    save(){
        const db = getDb();
        return db.collection('users')
        .insertOne(this);
    }

    addToCart(product){
        const cartProductIndex = this.cart.items.findIndex( cp => {
           return cp.productId.toString() === product._id.toString();
        })

        let newQuantity = 1;
        const updatedCartItems = [...this.cart.items];

        if(cartProductIndex >= 0 ){
            newQuantity = this.cart.items[cartProductIndex].quantity + 1;
            updatedCartItems[cartProductIndex].quantity = newQuantity;
        }else{
            updatedCartItems.push({
                                     productId : ObjectID(product._id) ,
                                     quantity : newQuantity
                                 });
        }

        const updatedCart = { items : updatedCartItems };
        console.log(updatedCart);
        console.log(this._id)
        const db = getDb();
        return db.collection('users')
        .findOneAndUpdate( { _id : ObjectID(this._id) },{ $set : { cart : updatedCart } })
        .then(result => console.log(result))
        .catch(err => console.log(err));
    }

    getCart(){

        const db = getDb();
        const productIds = this.cart.items.map(item => {
            return item.productId;
        })

        return db.collection('products')
        .find({_id : {$in : productIds }})
        .toArray()
        .then(products => {
            return  products.map(product => {
                return {
                    ...product,
                    quantity : this.cart.items.find(i => {
                        console.log(i.productId.toString() === product._id.toString());
                        return i.productId.toString() === product._id.toString();
                    }).quantity
                }
            })
        })
        .catch (err => console.log(err));
    }

    deleteItemFromCart(productId){
        const updatedCartItems = this.cart.items.filter(item => {
            return item.productId.toString() !== productId.toString();
        });
        const db = getDb();
        return db.collection('users')
        .findOneAndUpdate( { _id : ObjectID(this._id) },{ $set : { cart : {items : updatedCartItems} } });
    }

    addOrder(){
        const db = getDb();
        return this.getCart()
        .then(products => {
            const order = {
                items : products,
                user : {
                    _id : ObjectID(this._id),
                    name : this.name
                }
            }
            return  db.collection('orders')
            .insertOne(order)
        })
        .then(result => {
            this.cart = {items : []};
            return db.collection('users')
                    .findOneAndUpdate( { _id : ObjectID(this._id) },{ $set : { cart : {items : []} } });
        })
        .catch(err => console.log(err))
    }

    getOrders(){
        const db = getDb();
        return db.collection('orders').find({'user._id': ObjectID(this._id)}).toArray();
    }

    static findById(id){
        const db = getDb();
        return db.collection('users')
        .findOne({_id : ObjectID(id)})
        .then(user => {
           // console.log(user);
            return user
        })
        .catch(err => console.log(err));
    }
}

module.exports = User;