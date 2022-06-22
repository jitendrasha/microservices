const Express = require('express');

const app = Express();
app.use(Express.json());

const route = require('./src/routes/route');

const { SubscribeEvents } = require('./src/api/v1/api/Controller/shopping_ctr');

require('./src/database/conn');
const Port = 8003
app.get('/', (req, res) => {
    res.send("you are in shopping ");
});




app.post('/app-events', async(req, res, next) => {
    console.log("============= Shopping Service Received Event =====");
    const payload = req.body;
    SubscribeEvents(payload);
    return res.status(200).json()
});









app.use('/api', route);
app.listen(Port, () => {
    console.log(`app is running on port ${Port}`);
});