const express = require('express');
//use Router() for routing 
const router = express.Router();

const { getAddProductPage , getEditProductPage , postAddProduct , getAdminProducts , postEditProduct , postDeleteProduct } = require('../controllers/admin');

//Products page : we have to define '/admin/add-product' => GET 
router.get('/add-product', getAddProductPage )


//GetEdit Page =>  GET 
router.get('/edit-product/:id', getEditProductPage )


//Post Edit Request => POST 
router.post('/edit-product', postEditProduct )

//Post Delete Request => POST 
router.post('/delete-product', postDeleteProduct )


//Add Product Request '/admin/add-product' => POST  
router.post('/add-product', postAddProduct )


//Admin Products  : we have to define '/admin/products' => GET 
router.get('/products', getAdminProducts )

module.exports =  router;