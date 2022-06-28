const express = require('express');
const proxy = require('express-http-proxy');
const port = 8000
const app = express();
app.use(express.json());




app.use('/customer', proxy('localhost:8001'));
app.use('/shopping', proxy('localhost:8003'));
app.use('/', proxy('localhost:8002')); // product


app.listen(port, () => {
    console.log(`gateway is running at the ponit of ${port} `);
})