const axios = require('axios');
const fs = require('fs');

const baseUrl = 'http://localhost/api';
const imageId = "9699d9ba-d3d7-4270-b0fd-a45a38f12824";

const testEndpoints = async () => {
  let results = '';

  const endpoints = [
    { method: 'get', url: `${baseUrl}/images` },
    { method: 'get', url: `${baseUrl}/images/${imageId}` },
    { method: 'post', url: `${baseUrl}/images`, data: { url: "http://example.com/image.jpg", priority: 100 }},
    { method: 'put', url: `${baseUrl}/images/${imageId}`, data: { url: "http://example.com/updated-image.jpg", priority: 200 }}, 
    { method: 'delete', url: `${baseUrl}/images/${imageId}` } 
  ];

  const date = new Date();

  for (const endpoint of endpoints) {
    try {
      const response = await axios({ method: endpoint.method, url: endpoint.url, data: endpoint.data });
      results += `SUCCESS - ${endpoint.method.toUpperCase()} ${endpoint.url}: ${JSON.stringify(response.data)}\n`;
    } catch (error) {
      results += `ERROR - ${endpoint.method.toUpperCase()} ${endpoint.url}: ${error.message}\n`;
    }
  }

  fs.writeFileSync('apiTestResults.txt', results, { flag: 'a' });
  fs.writeFileSync('apiTestResults.txt', `Tests were done on: ${date}\n\n`, { flag: 'a' });
  console.log('API test results saved to apiTestResults.txt');
};

testEndpoints();
