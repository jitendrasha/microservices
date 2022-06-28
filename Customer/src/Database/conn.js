var mongoose = require('mongoose');
const { DB_URL } = require('../../config');
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
});
//Set up default mongoose connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));