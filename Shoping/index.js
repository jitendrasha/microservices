const Express = require('express');
const { port } = require('./config');


const app = Express();
app.use(Express.json());

const route = require('./src/routes/route');

const { SubscribeEvents } = require('./src/api/v1/Controller/shopping_ctr');

require('./src/database/conn');



app.post('/app-events', async(req, res, next) => {
    console.log("============= Shopping Service Received Event =====");
    const payload = req.body;
    SubscribeEvents(payload);
    return res.status(200).json()
});





app.use('/api', route);
app.listen(port, () => {
    console.log(` Product app is running on port ${port}`);
});