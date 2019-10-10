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
    const userId = req.user._id;
  //using sequelize assosiation in our model 
   const product = new Product(name,price,description,imageUrl,userId);
   product.save()
  .then(result => {
    console.log('Product Created.');
        res.redirect('/'); // we can redirect to other routes as well using redirect
    })
    .catch( err => { console.log(err) });
};


//getEditProductPage 
exports.getEditProductPage = (req,res,next) => {
    const productId = req.params.id;

    
    Product.findById(productId)
    .then(product => {

        if(!product){
            return res.redirect('/');
        }
        res.render('admin/edit-product' , {
            pageTitle : 'Edit '+ product.name,
            path : '/admin/edit-product',
            editing : true,
            product : product 
        });
    })
    .catch(err => console.log(err));
   
    
};




//postEditProduct
exports.postEditProduct = (req,res,next) => {
    //construct existing product 
    const productId = req.body.productId;
    const updatedName = req.body.name;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;
    const product = new Product(updatedName,updatedPrice,updatedDescription,updatedImageUrl);

    Product.findByIdAndUpdate(productId , product)
    .then( result => { 
        console.log('Updated Product!') 
        res.redirect('/admin/products');
    })
    .catch( err => console.log(err));
}



//getAdminProducts
exports.getAdminProducts = (req,res,next)=>{
    
    Product.fetchAll()
    .then(products => {
        res.render('admin/products' , {
            pageTitle : 'Admin Products' , 
            path : '/admin/products' ,
            products : products
        });
    })
    .catch(err=> console.log(err));
   
};


//postDeleteProduct
exports.postDeleteProduct = (req,res,next) => {
    const productId = req.body.productId;
    const productPrice = req.body.productPrice;
    Product.findOneAndDelete(productId)
    .then( product => {
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err)
    });

}

