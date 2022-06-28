const auth = require('../middleware/auth');
const express = require('express');

const Shopping = require('../api/v1/Controller/shopping_ctr');

const route = express.Router();
route.post('/order', auth, Shopping.PlaceOrder);

route.get('/orders', auth, Shopping.getOrders);
route.get('/cart', auth, Shopping.getCart);
route.delete('/deletecart', auth, Shopping.getCart);





module.exports = route;