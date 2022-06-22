const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const port = 8000
const app = express();
app.use(cors());



app.use(express.json());
app.use('/customer', proxy('localhost:8001'));
app.use('/shopping', proxy('localhost:8003'));
app.use('/', proxy('localhost:8002')); // product

// app.get('/g', (req, res) => {
//     console.log(" hello gateway")
//     res.send(" done gateway");
// })

app.get('/get', (req, res) => {
    res.send(" you are at  customer")
});



app.listen(port, () => {
    console.log(`gateway is running at the ponit of ${port} `);
})