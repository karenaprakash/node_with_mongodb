const Product = require('../models/product');


//getAddProductPage 
exports.getAddProductPage = (req,res,next) => {
        res.render('add-product' , {
            pageTitle : 'Add Product',
            path : '/add-product' 
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
        res.render('shop' , {
            pageTitle : 'Shop' , 
            path : '/' ,
            products : products
        });
    });
   
};