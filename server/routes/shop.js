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

//Product  : we have to define '/product' => GET 
router.get('/products/:productId', getProduct )

//Products  : we have to define '/products' => GET 
router.get('/products', getProducts )



module.exports = router;