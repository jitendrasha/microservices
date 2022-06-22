const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const APP_SECRET = process.env.APP_SECRET || "youarenowsecretkey";


//Utility functions
// module.exports.GenerateSalt = async() => {
//         return await bcrypt.genSalt()
//     },

module.exports.GeneratePassword = async(password) => {
    return await bcrypt.hash(password, 10);
};


module.exports.ValidatePassword = async(enteredPassword, savedPassword) => {
    return await bcrypt.compare(enteredPassword, savedPassword)
        // return await this.GeneratePassword(enteredPassword) === savedPassword;
};

module.exports.GenerateSignature = async(payload) => {
        return await jwt.sign(payload, APP_SECRET, { expiresIn: '1d' })
    },

    module.exports.ValidateSignature = async(req) => {

        const signature = req.get('Authorization');

        // console.log(signature);

        if (signature) {
            const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
            req.user = payload;
            return true;
        }

        return false
    };

module.exports.FormateData = (data) => {
    if (data) {
        return { data }
    } else {
        throw new Error('Data Not found!')
    }
}

module.exports.PublishCustomerEvent = async(payload) => {
    await axios.post('http://localhost:8001/app-events',
        payload
    )
    return
}

module.exports.PublishShoppingEvent = async(payload) => {
    await axios.post('http://localhost:8003/app-events',
        payload
    )
    return;
}