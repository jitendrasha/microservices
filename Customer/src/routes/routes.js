const Customer = require('../api/v1/controller/customer_ctrl');

const auth = require('../middleware/auth');
const express = require('express');
const { Router } = require('express');

const route = express.Router();



route.post('/login', Customer.SignIn);
route.post('/signup', Customer.SignUP);
route.post('/address', auth, Customer.CreateAddress);
route.get('/profile/:id', auth, Customer.GetProfile);
route.get('/shoping_details/:id', auth, Customer.GetShopingDetails);
module.exports = route;