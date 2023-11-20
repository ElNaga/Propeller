const axios = require('axios');
const fs = require('fs');

const baseUrl = 'http://localhost/api';

const testEndpoints = async () => {
    let results = '';
    const date = new Date();

    try {
        const createResponse = await axios.post(`${baseUrl}/images`, { url: "http://example.com/image.jpg", priority: 100 });
        const createdImageId = createResponse.data.id; 

        results += `SUCCESS - POST ${baseUrl}/images: Created Image ID: ${createdImageId}\n`;

        const endpoints = [
            { method: 'get', url: `${baseUrl}/images` },
            { method: 'get', url: `${baseUrl}/images/${createdImageId}` },
            { method: 'put', url: `${baseUrl}/images/${createdImageId}`, data: { url: "http://example.com/updated-image.jpg", priority: 200 }},
            { method: 'delete', url: `${baseUrl}/images/${createdImageId}` }
        ];

        for (const endpoint of endpoints) {
            try {
                const response = await axios({ method: endpoint.method, url: endpoint.url, data: endpoint.data });
                results += `SUCCESS - ${endpoint.method.toUpperCase()} ${endpoint.url}: ${JSON.stringify(response.data)}\n`;
            } catch (error) {
                results += `ERROR - ${endpoint.method.toUpperCase()} ${endpoint.url}: ${error.message}\n`;
            }
        }
    } catch (error) {
        results += `ERROR - POST ${baseUrl}/images: ${error.message}\n`;
    }

    fs.writeFileSync('apiTestResults-images.txt', results, { flag: 'a' });
    fs.writeFileSync('apiTestResults-images.txt', `Tests were done on: ${date}\n\n`, { flag: 'a' });
    console.log('Images API test results saved to apiTestResults.txt');
};

testEndpoints();