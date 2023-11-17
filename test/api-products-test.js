const axios = require('axios');
const fs = require('fs');

const baseUrl = 'http://localhost:80/api/products';

const testEndpoints = async () => {
    let results = '';
    let createdProductId = null;

    // Sample product data for POST and PUT requests
    const sampleProduct = {
        name: "Test Product",
        price: 19.99,
        status: "active",
        images: [] // Add image IDs if necessary
    };

    // REST Endpoints for Products
    try {
        // Create a new product
        const createResponse = await axios.post(baseUrl, sampleProduct);
        createdProductId = createResponse.data.id; // Adjust according to your API response
        results += `CREATE SUCCESS: ${JSON.stringify(createResponse.data)}\n`;
        results += `id is: ${JSON.stringify(createResponse.data.id)}\n`;

        // Get all products
        const getAllResponse = await axios.get(baseUrl);
        results += `GET ALL SUCCESS: ${JSON.stringify(getAllResponse.data)}\n`;

        // Get the created product by ID
        const getByIdResponse = await axios.get(`${baseUrl}/${createdProductId}`);
        results += `GET BY ID SUCCESS: ${JSON.stringify(getByIdResponse.data)}\n`;

        // Update the product
        const updatedProduct = { ...sampleProduct, price: 29.99 };
        const updateResponse = await axios.put(`${baseUrl}/${createdProductId}`, updatedProduct);
        results += `UPDATE SUCCESS: ${JSON.stringify(updateResponse.data)}\n`;

        // Delete the product
        const deleteResponse = await axios.delete(`${baseUrl}/${createdProductId}`);
        results += `DELETE SUCCESS: ${JSON.stringify(deleteResponse.data)}\n`;

    } catch (error) {
        results += `ERROR: ${error.message}\n`;
    }

    fs.writeFileSync('apiTestResults-products.txt', results);
    console.log('Products API test results saved to apiTestResults-products.txt');
};

testEndpoints();
