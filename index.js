const express = require("express")
const cors = require('cors');
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();

const products = require('./products.json')

app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Fashionista server is running...');
});

app.get('/products', (req, res) => {
    res.send(products);
});

app.get('/products/hotdeals', (req, res) => {
    const hotDealProducts = products?.slice(0, 8)
    res.send(hotDealProducts);
});

app.get('/products/popular', (req, res) => {
    const popularProducts = products?.slice(29, 37)
    res.send(popularProducts);
});
app.get('/products/search', (req, res) => {
    const query = req.query.searchTerm
    if(query){
        const product = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
        res.send(product)
    }
});
app.get('/products/:id', (req, res) => {
    const id = req.params.id;
    const product = products.find(p => p.id === id)
    res.send(product);
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

