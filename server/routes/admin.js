const express = require('express');
//use Router() for routing 
const router = express.Router();

const { getAddProductPage , postAddProduct } = require('../controllers/products');

//Products page : we have to define '/admin/add-product' => GET 
router.get('/add-product', getAddProductPage )

//Add Product Request '/admin/add-product' => POST  
router.post('/add-product', postAddProduct )

module.exports =  router;