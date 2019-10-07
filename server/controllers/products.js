const Product = require('../models/product');


//getAddProductPage 
exports.getAddProductPage = (req,res,next) => {
        res.render('admin/add-product' , {
            pageTitle : 'Add Product',
            path : '/admin/add-product' 
        });
};

//postAddProduct
exports.postAddProduct = (req,res,next) => {
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/'); // we can redirect to other routes as well using redirect
};

//getProducts
exports.getProducts = (req,res,next)=>{
    //it first complete all fetch then call our res.renderfunction 
    const products = Product.fetchAll( products => {
        res.render('shop/product-list' , {
            pageTitle : 'Shop' , 
            path : '/' ,
            products : products
        });
    });
   
};

//getAdminProducts
exports.getAdminProducts = (req,res,next)=>{
    //it first complete all fetch then call our res.renderfunction 
    const products = Product.fetchAll( products => {
        res.render('admin/products' , {
            pageTitle : 'Admin Products' , 
            path : '/admin/products' ,
            products : products
        });
    });
   
};


//getCart
exports.getCart = (req,res,next)=>{

    res.render('shop/cart' , {
        pageTitle : 'Cart' , 
        path : '/cart'
    });
   
};

//getCart
exports.getCheckout = (req,res,next)=>{

    res.render('shop/checkout' , {
        pageTitle : 'Checkout' , 
        path : '/checkout'
    });
   
};

