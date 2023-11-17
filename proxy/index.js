const config = require("../utils/config");
const express = require('express');
const proxy = require('express-http-proxy');

const app = express();

const localPort = 80;

app.use(
    '/api/products',
    proxy(
        `http://127.0.0.1:${config.get('services').products.port}`,
        {
            proxyReqPathResolver: (req) => `http://127.0.0.1:${config.get('services').products.port}/api/products${req.url}`
        }
    )
);

app.use(
    '/api/images',
    proxy(
        `http://127.0.0.1:${config.get('services').images.port}`,
        {
            proxyReqPathResolver: (req) => `http://127.0.0.1:${config.get('services').images.port}/api/images${req.url}`
        }
    )
);

app.use(
    '/graphql',
    proxy(
        `http://127.0.0.1:${config.get('services').graphql.port}`,
        {
            proxyReqPathResolver: (req) => `http://127.0.0.1:${config.get('services').graphql.port}/graphql${req.url}`
        }
    )
);

app.listen(config.get('services').proxy.port, err => {
    if (err) {
        return console.log(err);
    }
    console.log(`[Proxy] service succesfully started on port ${config.get('services').proxy.port}`);
})