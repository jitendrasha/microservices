const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        require: true,
        unqiue: true

    },
    password: String,
    address: [
        { type: Schema.Types.ObjectId, ref: 'address', require: true }
    ],

    cart: [{
        product: {
            _id: { type: String, require: true },
            name: { type: String },
            banner: { type: String },
            price: { type: Number }
        }
    }],
    Wishlist: [{

        _id: { type: String, require: true },
        name: { type: String },
        description: { type: String },
        banner: { type: String },
        available: { type: Boolean },
        price: { type: Number }

    }],
    orders: [{

        _id: { type: String, require: true },
        amount: { type: String },
        date: { type: Date, default: Date.now() }


    }],
}, {
    toJson: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.__v;
        }
    },
    timestamps: true


});

module.exports = User = mongoose.model('user', CustomerSchema);