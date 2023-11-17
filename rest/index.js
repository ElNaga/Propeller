const config = require("../utils/config");
const express = require('express');
// const proxy = require('express-http-proxy'); 

const app = express();


app.get('/api', (req, res) => {
    res.send('Hearbeat OK');
});

app.listen(config.get('services').rest.port, err => {
    if (err) {
        return console.log(err);
    }
    console.log(`[Proxy] service succesfully started on port ${config.get('services').rest.port}`);
})