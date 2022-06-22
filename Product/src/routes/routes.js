const Product = require('../api/v1/controller/product-controller');
const express = require('express')
const auth = require('../middleware/auth');
const route = express.Router();

// routes for Product......


route.post('/create', Product.CreateProducts);
route.get('/product', Product.GetProducts);
route.get('/category', Product.FindByCategory);
route.post('/ids', Product.FindSelectedProducts);
route.put('/cart', auth, Product.addToCart);
route.get('/:id', auth, Product.GetProductDescription);
route.delete('/cart/:id', auth, Product.addToCart);


// route.get('/g', (req, res) => {
//     res.send(" hello again");
// });


module.exports = route;