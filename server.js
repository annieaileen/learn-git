const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let orders = [];

app.post('/order', (req, res) => {
    orders.push(req.body);
    console.log('New order:', req.body);
    res.status(200).send('Order received');
});

app.listen(3000, () => console.log('Server running on port 3000'));