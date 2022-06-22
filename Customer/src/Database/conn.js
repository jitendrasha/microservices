var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/microservices', {
    useNewUrlParser: true,
    //useFindAndModify: false,
    //useUnifiedTopology: true
});
//Set up default mongoose connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));