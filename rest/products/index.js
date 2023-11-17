const express = require('express');
const db = require('../../utils/db');
const config = require('../../utils/config');
const productHandlers = require('./handlers/products');

db.init();

const api = express();
api.use(express.json());

// api.get('/api', (req, res) => {
//     res.send('Heartbeat OK');
// });

// Product Routes
api.get('/api/products', productHandlers.getAllProducts);
api.get('/api/products/:productId', productHandlers.getProductById);
api.post('/api/products', productHandlers.createProduct);
api.put('/api/products/:productId', productHandlers.updateProduct);
api.delete('/api/products/:productId', productHandlers.deleteProduct);

api.listen(config.get('services').products.port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`[Products] service successfully started on port ${config.get('services').products.port}`);
});