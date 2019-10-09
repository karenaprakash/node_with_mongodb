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
/*
    Product.create({
                name : name,
                imageUrl : imageUrl,
                price : price,
                description : description,
                userId : req.user.id
    })
    .then(result => {
        console.log('Product Created.');
        res.redirect('/'); // we can redirect to other routes as well using redirect
    })
    .catch( err => { console.log(err) });
   */
  //using sequelize assosiation in our model 
  req.user
  .createProduct({
    name : name,
    imageUrl : imageUrl,
    price : price,
    description : description,
  })
  .then(result => {
    console.log('Product Created.');
        res.redirect('/'); // we can redirect to other routes as well using redirect
    })
    .catch( err => { console.log(err) });
};

//getEditProductPage 
exports.getEditProductPage = (req,res,next) => {
    const productId = req.params.id;

    req.user.
    getProducts({where : { id : productId }})
    //Product.findByPk(productId)
    .then(products => {
        const product = products[0];
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

//getAdminProducts
exports.getAdminProducts = (req,res,next)=>{
    req.user.getProducts()
    //Product.findAll()
    .then(products => {
        res.render('admin/products' , {
            pageTitle : 'Admin Products' , 
            path : '/admin/products' ,
            products : products
        });
    })
    .catch(err=> console.log(err));
   
};

//postEditProduct
exports.postEditProduct = (req,res,next) => {
    //construct existing product 
    const productId = req.body.productId;

    const updatedName = req.body.name;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDescription = req.body.description;

    Product.findByPk(productId)
    .then( product => {
        product.name = updatedName;
        product.imageUrl = updatedImageUrl;
        product.price = updatedPrice;
        product.description = updatedDescription;
        return product.save();
    })
    .then( result => { 
        console.log('Updated Product!') 
        res.redirect('/admin/products');
    })
    .catch( err => console.log(err));

   

}

//postDeleteProduct
exports.postDeleteProduct = (req,res,next) => {
    const productId = req.body.productId;
    const productPrice = req.body.productPrice;
    Product.findByPk(productId)
    .then( product => {
       return product.destroy();
    })
    .then( result => {
        console.log('Product deleted!')
        res.redirect('/admin/products');
    })
    .catch(err => {
        console.log(err)
    });



}