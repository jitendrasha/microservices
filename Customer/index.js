const express = require('express');
const app = express();
const { port } = require('./config');


const docs = require('./docs')
const swaggerUI = require("swagger-ui-express");
const swaggerJsdoc = require('swagger-jsdoc');


app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));


//swagger implementation...
// const options = {
//     definition: {
//         openapi: '3.0.0',
//         info: {
//             title: 'Hello World',
//             version: '1.0.0',
//         },

//         servers: [{
//             url: 'http://localhost:8001/'
//         }]
//     },
//     apis: ['./src/routes/routes.js'], // files containing annotations as above
// // };
// const docs = swaggerJsdoc(options);
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));




const cors = require("cors");
// const docs = require('./docs');
require('./src/Database/conn');

app.get('/', (req, res) => {
    res.send("hello");
})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
// app.use(
//     `/${Config.get("hostSubAddress")}/docs`,
//     swaggerUI.serve,
//     swaggerUI.setup(swaggerJSDoc(optionsPayload))
// );
// app.use('/api-docs', swaggerUI.serve, swaggerUI.setup());
app.use(express.json());


const { SubscribeEvents } = require('./src/api/v1/controller/customer_ctrl');
const route = require('./src/routes/routes');
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use('/api', route);







app.post('/app-events', async(req, res, next) => {
    console.log("============= Customer Service Received Event =====");
    const payload = req.body;
    SubscribeEvents(payload);
    return res.status(200).json(payload)
});



app.listen(port, function() {
    console.log(` Customer Server started on ${port}`);

});