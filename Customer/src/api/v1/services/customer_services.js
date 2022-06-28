const CustomerModel = require('../../../Database/models/customer');
const AddressModel = require('../../../Database/models/address');

require('../../../helper/apiError')
async function CreateCustomer(name, email, password) {
    try {
        // const existingCustomer = await FindCustomer({ email });

        // if (existingCustomer) {
        //     // const userExistes = CustomerModel.findOne({ email });
        //     // console.log("user Exist", userExistes);
        //     // if (userExistes) {
        //     return "you have already  account Please Login";
        // } else {

        const customer = new CustomerModel({
            name,
            email,
            password,
        });
        customer.save({
            name,
            email,
            password
        });
        return customer;

    } catch (err) {
        console.log(err);
        return err;
    }
}

async function CreateAddress({ _id, street, postalCode, city, country }) {

    try {
        const profile = await CustomerModel.findById(_id);

        console.log(profile);

        if (profile) {

            const newAddress = new AddressModel({
                street,
                postalCode,
                city,
                country
            })

            await newAddress.save();

            profile.address.push(newAddress);
        }

        return await profile.save();

    } catch (err) {
        return console.log(" occuired some error");
    }
}



async function FindCustomer({ email }) {


    console.log(email);
    try {
        const existingCustomer = await CustomerModel.findOne({ email });
        // console.log("user", existingCustomer);
        return existingCustomer;
    } catch (err) {
        throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer');

        // console.log(err);
    }
}

async function FindCustomers() {


    try {
        const customerList = await CustomerModel.find({});
        // console.log("user", existingCustomer);
        return customerList;
    } catch (err) {
        throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer');

        // console.log(err);
    }
}



// find Customer by id....
async function FindCustomerById(id) {
    console.log(id);
    try {
        const existingCustomer = await CustomerModel.findById(
            id
        ).populate('address')

        return existingCustomer;
    } catch (err) {
        throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Find Customer');
    }
}

async function Wishlist(id) {

    console.log("do");


    try {
        const profile = await CustomerModel.findById({
            id
        }).populate('wishlist');


        return profile.wishlist;
    } catch (error) {
        return;
    }

}
async function AddWishlistItem(customerId, { _id, name, desc, price, available, banner }) {


    const product = {
        _id,
        name,
        desc,
        price,
        available,
        banner
    };

    try {
        const profile = await CustomerModel.findById(customerId).populate('wishlist');

        if (profile) {

            let wishlist = profile.wishlist;

            if (wishlist.length > 0) {
                let isExist = false;
                wishlist.map(item => {
                    if (item._id.toString() === product._id.toString()) {
                        const index = wishlist.indexOf(item);
                        wishlist.splice(index, 1);
                        isExist = true;
                    }
                });

                if (!isExist) {
                    wishlist.push(product);
                }

            } else {
                wishlist.push(product);
            }

            profile.wishlist = wishlist;
        }

        const profileResult = await profile.save();

        return profileResult.wishlist;

    } catch (err) {
        throw APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to Add to WishList')
    }

}


async function AddCartItem(userid, { _id, name, price, banner }, qty, isRemove) {
    console.log("hello");
    try {
        const profile = await CustomerModel.findById(userid).populate('cart');
        console.log("Profile", profile)
        if (profile) {
            const cartItem = {
                product: { _id, name, price, banner },
                unit: qty,
            }


            let cartItems = profile.cart;
            console.log("cartItems", cartItems)

            if (cartItems.length > 0) {
                let isExist = false;


                cartItems.map(items => {
                    if (items.product._id.toString() === _id.toString()) {
                        if (isRemove) {
                            cartItems.splice(cartItems.indexOf(items), 1);
                        } else {
                            items.unit = qty;
                        }
                        isExist = true;
                    }
                });

                if (!isExist) {
                    cartItems.push(cartItem);
                }
            } else {
                cartItems.push(cartItem)
            }

            profile.cart = cartItems;

            const cartSaveResult = await profile.save();
            return cartSaveResult;

        }

        throw new Error('unable to add to cart');
    } catch (error) {
        return error;
    }

}


async function AddOrderToProfile(customerId, order) {


    try {
        const profile = await CustomerModel.findById(customerId);

        if (profile) {
            if (profile.orders == undefined) {
                profile.orders = []
            }

            profile.orders.push(order);

            profile.cart = [];

            const profileResult = await profile.save();

            return profileResult;

        }

        throw " error occrued"
    } catch (error) {
        return error;
    }
}





module.exports = { CreateCustomer, FindCustomer, FindCustomerById, FindCustomers, CreateAddress, AddCartItem, AddOrderToProfile, AddWishlistItem, Wishlist };