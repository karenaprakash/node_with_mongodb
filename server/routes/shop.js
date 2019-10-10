const express = require('express');
//importing html files from views 

const router = express.Router();
const {getProducts , getCart , postCart , postOrders , getOrders, getIndex , getProduct , postCartDeleteItem } = require('../controllers/shop');

//Home Page
router.get('/', getIndex );

//Cart Page
router.get('/cart', getCart);

//Cart Page
router.post('/cart', postCart);

//Cart Delete Item

router.post('/cart-delete-item', postCartDeleteItem);


//Checkout Page
router.post('/orders', postOrders);

//Orders page
router.get('/orders', getOrders);

//Products  : we have to define '/products' => GET 
router.get('/products', getProducts )

//Products  : we have to define '/products' => GET 
router.get('/products/:productId', getProduct )

module.exports = router;