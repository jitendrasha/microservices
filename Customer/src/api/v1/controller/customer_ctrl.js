const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../../../helper/auth');
const {
    CreateAddress,
    CreateCustomer,
    FindCustomer,
    FindCustomerById,
    AddOrderToProfile,
    AddCartItem,

} = require('../services/customer_services');

var controllers = {



    SignIn: async function(req, res) {
        // throw APIError.notFound('Data Not found');

        const { email, password } = req.body;
        // console.log(email);
        try {

            const existingCustomer = await FindCustomer({ email });

            if (existingCustomer) {

                const validPassword = await ValidatePassword(password, existingCustomer.password);
                console.log(validPassword);
                if (validPassword) {


                    const token = await GenerateSignature({ email: existingCustomer.email, _id: existingCustomer._id });
                    return res.send({

                        token: token,
                        message: "you have logged"
                    });
                }

                return res.send(" Wrong credentials")
            }
        } catch (err) {
            // throw new APIError('Data Not found', err)
            console.log(err);
        }
    },


    SignUP: async function(req, res) {
        let { email, password, name } = req.body;
        const existingCustomer = await FindCustomer({ email });

        if (!existingCustomer) {
            password = await GeneratePassword(password);
            const abc = await CreateCustomer(name, email, password);
            return res.json({
                Message: "user added "
            });
        } else {
            return res.json({
                "message": "you have already account"
            })
        }



    },

    // create Address of the customer...
    CreateAddress: async function(req, res) {

        const _id = req.user._id;
        //console.log(req.body);
        const { street, postalCode, city, country } = req.body;
        //console.log(street);

        try {
            const addressResult = await CreateAddress({ _id, street, postalCode, city, country })
            return res.send(addressResult);

        } catch (err) {
            console.log(err);
        }
    },

    // Cet customer by id...
    GetProfile: async function(req, res) {
        const _id = req.user._id;

        //console.log(_id);

        //  res.send(_id)

        try {
            const existingCustomer = await FindCustomerById({
                _id
            });
            console.log(existingCustomer);

            return res.send(existingCustomer);
        } catch (error) {
            return error;
        }
    },


    GetShopingDetails: async function(req, res) {
        const _id = req.user._id;
        try {
            const existingCustomer = await FindCustomerById({
                _id
            });

            if (existingCustomer) {
                return res.send(existingCustomer);
            }

            return res.send("no such user found...");

        } catch (error) {
            return error;
        }

    },



    async ManageCart(userid, product, qty, isRemove = false) {
        // let { id, product, qty, isRemove } = req.body

        try {
            const cartResult = await AddCartItem(userid, product, qty, isRemove);
            return cartResult;
        } catch (error) {
            return error;
        }
    },
    ManageOrder: async function(req, res) {
        const _id = req.user._id;


        try {
            const orderResult = await AddOrderToProfile(_id, Order);

            return res.send(orderResult);
        } catch (error) {
            return error
        }
    },
    SubscribeEvents: async function(payload) {

        const { event, data } = payload;
        console.log("EVENT", event)

        const { userid, product, order, qty } = data;


        switch (event) {

            case 'ADD_TO_CART':

                console.log("INSIDE SWITCH",
                    payload);
                await AddCartItem(userid, product, qty, false);
                // await this.ManageCart(userid, product, qty, false);
                break;
            case 'REMOVE_FROM_CART':
                this.ManageCart(userid, product, qty, true);
                break;
            case 'CREATE_ORDER':
                await AddOrderToProfile(userid, order);
                break;
            default:
                break;
        }

    }

















};







module.exports = controllers;