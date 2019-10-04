const express = require('express');
const route = express.Router();
const { fourOFourController } = require('../controllers/fourOFour');

//add 404 page 
route.use( fourOFourController );

module.exports = route;