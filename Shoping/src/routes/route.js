const auth = require('../middleware/auth');
const express = require('express');

const Shopping = require('../api/v1/api/Controller/shopping_ctr');
// const { Router } = require('express');

const route = express.Router();


route.post('/order', auth, Shopping.PlaceOrder);

route.get('/orders', auth, Shopping.getOrders);
route.get('/cart', auth, Shopping.getCart);





module.exports = route;