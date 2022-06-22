const Shop = require('../Services/services');
//const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../../../helper/auth');
const { PublishCustomerEvent } = require('../../../../helper/auth');





var controller = {

    getCart: async function(req, res) {
        const _id = req.user._id;
        console.log(_id);

        try {
            const cartItems = await Shop.Cart(_id)
            return res.send(cartItems);
        } catch (error) {
            throw error
        }
    },



    // Place order...

    PlaceOrder: async function(req, res) {
        const _id = req.user._id;

        console.log(_id);
        const txnNumber = "1234"

        try {
            const orderResult = await Shop.CreateNewOrder(_id, txnNumber);
            console.log(orderResult);

            // res.send(orderResult);

            const payload = {
                event: 'CREATE_ORDER',
                data: {
                    userid: _id,
                    order: orderResult
                }
            };
            PublishCustomerEvent(payload);
            return res.send(payload);
        } catch (error) {
            return error;
        }

    },

    getOrders: async function(req, res) {
        const _id = req.user._id;

        try {
            const Orders = await Shop.Orders(_id);

            return res.send(Orders)
        } catch (error) {
            return error;
        }
    },


    // ManageCart: async function(req, res) {
    //     const _id = req.user._id;
    //     // const { item, qty, isRemove } = req.body;


    //     try {
    //         const cartResult = await Shop.AddCartItem(_id, item, qty, isRemove);
    //         return cartResult;
    //     } catch (error) {
    //         throw error;

    //     }

    // },

    async ManageCart(item, qty, isRemove = false) {
        // let { id, product, qty, isRemove } = req.body


        try {
            const cartResult = await Shop.AddCartItem(userid, item, qty, isRemove);

            return cartResult;
        } catch (error) {
            return error;
        }
    },








    GetOrderPayload(req, res) {
        const _id = req.user._id;

        const { order } = req.body;
        if (order) {
            const payload = {
                event: "CREATE_ORDER",

                data: { _id, order }
            };
            return payload;
        } else {
            return " No order Available";
        }
    },


    SubscribeEvents: async function(payload) {

        const { event, data } = payload;
        console.log("data:",
            data)

        const { userid, product, qty } = data;

        console.log(userid);

        switch (event) {
            case 'ADD_TO_CART':

                // console.log("INSIDE SWITCH",
                //     payload);
                await Shop.AddCartItem(userid, product, qty, false);

                // case 'REMOVE_FROM_CART':
                //     this.ManageCart(userId, product, qty, true);

                //     // this.ManageCart(userId, product, qty, true);
                //     break;
            default:
                break;
        }

    },





}



module.exports = controller;