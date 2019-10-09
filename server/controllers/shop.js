const Product = require('../models/product');
const Cart = require('../models/cart');

//getProducts
exports.getProducts = (req,res,next)=>{

    Product.findAll()
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

 /*   Product.findAll({ where : { id : productId } })
    .then( products => {
        res.render('shop/product-detail' , {
            pageTitle : products[0].name , 
            path : '/products' ,
            product : products[0]
        })
    })
    .catch(err => console.log(err));
*/
  
  Product.findByPk(productId)
    .then(product => {
        res.render('shop/product-detail' , {
            pageTitle : product.name , 
            path : '/products' ,
            product : product
        })
    }).catch(err => console.log(err));

   // res.redirect('/');
};


//getIndex
exports.getIndex = (req,res,next)=>{
    Product.findAll()
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
    Product.findById(productId,product => { 
            Cart.addProduct(productId,product.price)
        });   
    res.redirect('/cart')
};

//postCartDeleteItem
exports.postCartDeleteItem = (req,res,next) => {
    const productId = req.body.productId;
    const productPrice = req.body.productPrice;
    Cart.deleteProduct(productId,productPrice);   
    res.redirect('/cart')
}

//getCart
exports.getCart = (req,res,next)=>{
    Cart.getCart(cart => {
        console.log(cart)
        Product.fetchAll( products => {
            const cartProducts = [];            
            for( let product of products){
                const cartProduct = cart.products.find( prod => prod.id === product.id);
                if(cartProduct){
                    cartProducts.push({ productData : product , qty : cartProduct.qty });
                }
            }
            res.render('shop/cart' , {
                pageTitle : 'Your Cart' , 
                path : '/cart',
                products : cartProducts
            });
        })
        
    })

};



//getCart
exports.getCheckout = (req,res,next)=>{

    res.render('shop/checkout' , {
        pageTitle : 'Checkout' , 
        path : '/checkout'
    });
   
};

