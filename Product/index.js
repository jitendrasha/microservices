const express = require('express');

const app = express();

app.use(express.json());

const port = 8002

// require('./src/middleware/app_events');
require('./src/Database/connection');
const route = require('./src/routes/routes');

app.get('/get', (req, res) => {
    res.send(" you are at  Product")
})
app.use('/api', route);

app.use('/app-events', async(req, res, next) => {
    const { payload } = req.body;
    console.log(payload);


    console.log("============= Product Service Received Event =====");
    return res.status(200).json(payload)
});




app.listen(port, () => {
    console.log(`Server is running at port ${port}`)
});