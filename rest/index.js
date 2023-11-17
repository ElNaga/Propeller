const config = require("../utils/config");
const express = require('express');
const db = require("../utils/db");

db.init();

const api = express();
api.use(express.json());


api.get('/api', (req, res) => {
    res.send('Hearbeat OK');
});




api.listen(config.get('services').rest.port, err => {
    if (err) {
        return console.log(err);
    }
    console.log(`[Rest] service succesfully started on port ${config.get('services').rest.port}`);
})