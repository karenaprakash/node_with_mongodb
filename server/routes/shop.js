const express = require('express');
//importing html files from views 

const router = express.Router();
const {getProducts} = require('../controllers/products');

//Home Page
router.get('/', getProducts);

module.exports = router;