const express = require('express');
const db = require('../../utils/db');
const config = require('../../utils/config');
const imageHandlers = require('./handlers/images');

db.init();

const api = express();
api.use(express.json());

api.get('/api/images', imageHandlers.getAllImages);
api.get('/api/images/:imageId', imageHandlers.getImageById);
api.post('/api/images', imageHandlers.createImage);
api.put('/api/images/:imageId', imageHandlers.updateImage);
api.delete('/api/images/:imageId', imageHandlers.deleteImage);

api.listen(config.get('services').images.port, err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(`[Images] service successfully started on port ${config.get('services').images.port}`);
});
