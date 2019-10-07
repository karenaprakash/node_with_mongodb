const Product = require('../models/product');


//getAddProductPage 
exports.getAddProductPage = (req,res,next) => {
        res.render('admin/edit-product' , {
            pageTitle : 'Add Product',
            path : '/admin/add-product',
            editing : false 
        });
};

//postAddProduct
exports.postAddProduct = (req,res,next) => {
    const name = req.body.name;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(null,name,imageUrl,price,description);
    product.save();
    res.redirect('/'); // we can redirect to other routes as well using redirect
};

//getEditProductPage 
exports.getEditProductPage = (req,res,next) => {
    const productId = req.params.id;
    Product.findById(productId, product => {
        if(!product){
           return res.redirect('/');
        }
        console.log(product.price)
        res.render('admin/edit-product' , {
            pageTitle : 'Edit Product',
            path : '/admin/edit-product',
            editing : true,
            product : product 
        });
    })
    
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

//postEditProduct
exports.postEditProduct = (req,res,next) => {
    //construct existing product 
    const productId = req.body.productId;

    const updatedName = req.body.name;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const updatedProduct = new Product(
        productId,
        updatedName,
        updatedImageUrl,
        updatedPrice,
        updatedDescription
    );
    
    updatedProduct.save();

    res.redirect('/admin/products');

}

//postDeleteProduct
exports.postDeleteProduct = (req,res,next) => {
    const productId = req.body.productId;
    const productPrice = req.body.productPrice;

    Product.deleteProductById(productId,productPrice);

    res.redirect('/admin/products');



}