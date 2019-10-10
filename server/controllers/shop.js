const Product = require('../models/product');
//const Cart = require('../models/cart');
//const Order = require('../models/order');

//getProducts
exports.getProducts = (req,res,next)=>{

    Product.fetchAll()
    .then((products) => {
        res.render('shop/product-list' , {
            pageTitle : 'All Products' , 
            path : '/products' ,
            products : products
        });
    })
    .catch( err => { console.log(err) });
};


//getProduct
exports.getProduct = (req,res,next)=>{

    const productId = req.params.productId;
    console.log(productId)

  Product.findById(productId)
    .then(product => {
        res.render('shop/product-detail' , {
            pageTitle : product.name , 
            path : '/products' ,
            product : product
        })
    }).catch(err => console.log(err));

};


//getIndex
exports.getIndex = (req,res,next)=>{
    Product.fetchAll()
    .then((products) => {
        res.render('shop/index' , {
            pageTitle : 'Index Products' , 
            path : '/' ,
            products : products
        });
    })
    .catch( err => { console.log(err) });
   
};


//postCart
exports.postCart = (req,res,next)=>{


    productId = req.body.productId;
    
    Product.findById(productId)
    .then(product => {
         req.user.addToCart(product);
         res.redirect('/cart');
    })
    .catch(err => console.log(err));
    
};

//postCartDeleteItem
exports.postCartDeleteItem = (req,res,next) => {
    const productId = req.body.productId;
    req.user.deleteItemFromCart(productId)
    .then(result => {
        res.redirect('/cart')
    })
    .catch(err => console.log(err));
    
}

//getCart
exports.getCart = (req,res,next)=>{
  
    req.user.getCart()
    .then( products => {
        res.render('shop/cart' , {
            pageTitle : 'Your Cart' , 
            path : '/cart',
            products : products
        });
    })
    .catch(err=>console.log(err));

};

exports.postOrders = (req,res,next) => {
    let fetchedCart;
    req.user
    .addOrder()
    .then(result => {
        res.redirect('/orders');
    })
    .catch(err => console.log(err));
}

exports.getOrders = (req,res,next) => {
    req.user.getOrders()
    .then(orders => {
        res.render('shop/order' , {
            pageTitle : 'Order' , 
            path : '/orders',
            orders : orders
        });
    })
    .catch(err => console.log(err));
    
}


