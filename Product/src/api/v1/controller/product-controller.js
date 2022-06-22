// const { FindById } = require('../../../Database/models/products');
const products = require('../../../Database/models/products');
const { PublishCustomerEvent, PublishShoppingEvent } = require('../../../helper/auth');
const {
    CreateProduct,
    Products,
    FindById,
    FindByCategory,
    FindSelectedProducts
} = require('../services/product_services');


var controller = {

    CreateProducts: async function(req, res) {

        // return res.send("helo");
        // let { name, desc, type, unit, price, available, suplier, banner } = req.body
        console.log("youare");

        try {
            const productResult = await CreateProduct(req.body);
            return res.send(productResult);
        } catch (error) {
            return;
        }

    },


    GetProducts: async function(req, res) {
        try {
            const products = await Products();

            let categories = {};

            products.map(({ type }) => {
                categories[type] = type;
            });

            return res.send({

                Product: products,
                categories: Object.keys(categories),

            })
        } catch (error) {
            retrun("unwantd error", error);
        }

    },

    GetProductDescription: async function(req, res) {
        const id = req.user._id;
        // console.log(id);
        try {
            // const id = id;
            const product = await FindById(id);
            return res.send(product);
        } catch (error) {
            return;
        }

    },


    FindByCategory: async function(req, res) {
        // res.send(" hendhfdskjf");

        const {
            category
        } = req.query;
        // // res.send(category);

        // return;

        try {
            const product = await FindByCategory(category);
            return res.send(product);
        } catch (error) {
            return;
        }
    },

    FindSelectedProducts: async function(req, res) {

        try {
            const { ids } = req.body;
            const products = await FindSelectedProducts(ids);
            return res.send(products);
        } catch (error) {
            return error;
        }

    },


    addToCart: async function(req, res) {
        const { qty } = req.body

        const product = await FindById(req.body._id);
        if (product) {
            const payload = {
                event: "ADD_TO_CART",
                data: { userid: req.user._id, product: product, qty: qty }
            }
            await PublishShoppingEvent(payload);

            await PublishCustomerEvent(payload);





            return res.send(payload);
        } else {
            return " No product available";
        }
    },





}


module.exports = controller;