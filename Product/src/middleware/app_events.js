module.exports = (app) => {



    app.use('/app-events', async(req, res, next) => {
        const { payload } = req.body;

        customer_ctrl.SubscribeEvents(payload);


        console.log("============= Product Service Received Event =====");
        return res.status(200).json(payload)
    });
}