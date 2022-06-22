const express = require('express');
const app = express();
app.use(express.json());
const { SubscribeEvents } = require('./src/api/v1/controller/customer_ctrl');
require('./src/Database/conn');
const route = require('./src/routes/routes');
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

const port = 8001;
app.use('/api', route);







app.post('/app-events', async(req, res, next) => {
    console.log("============= Customer Service Received Event =====");
    const payload = req.body;
    SubscribeEvents(payload);
    return res.status(200).json(payload)
});



app.listen(8001, function() {
    console.log(`Server started on ${port}`);
});