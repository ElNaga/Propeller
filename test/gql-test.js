const axios = require('axios');
const fs = require('fs');

const graphqlUrl = 'http://localhost:80/graphql';

const performGraphQLOperation = async (query, variables = {}) => {
    try {
        const response = await axios.post(graphqlUrl, { query, variables });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data || error.message);
    }
};

const testGraphQLEndpoints = async () => {
    let results = '';

    const operations = [
        // Query all products
        {
            name: 'Query all products',
            query: `
                query {
                    products {
                        id
                        name
                        price
                        status
                        images {
                            id
                            url
                        }
                    }
                }
            `,
        },
        // Query a single product by ID (replace with an actual ID)
        {
            name: 'Query a single product by ID',
            query: `
                query {
                    product(id: "e4233343-8dfe-4512-b2ef-e958226fb5cb") {
                        id
                        name
                        price
                        status
                        images {
                            id
                            url
                        }
                    }
                }
            `,
        },
        // Create a new product
        {
            name: 'Create a new product',
            query: `
                mutation CreateProduct($input: CreateProductInput!) {
                    createProduct(input: $input) {
                        id
                        name
                    }
                }
            `,
            variables: {
                input: {
                    name: "New Product",
                    price: 20.99,
                    status: "active",
                    images: [] // Add image IDs if necessary
                }
            }
        },
        // Update a product (replace with an actual ID)
        {
            name: 'Update a product',
            query: `
                mutation UpdateProduct($id: String!, $input: UpdateProductInput!) {
                    updateProduct(id: $id, input: $input) {
                        id
                        name
                    }
                }
            `,
            variables: {
                id: "e4233343-8dfe-4512-b2ef-e958226fb5cb",
                input: {
                    name: "Updated Product",
                    price: 25.99,
                    status: "inactive",
                    images: [] // Update image IDs if necessary
                }
            }
        },
        // Delete a product (replace with an actual ID)
        {
            name: 'Delete a product',
            query: `
                mutation DeleteProduct($id: String!) {
                    deleteProduct(id: $id)
                }
            `,
            variables: {
                id: "e4233343-8dfe-4512-b2ef-e958226fb5cb"
            }
        },
        // Query all images
        {
            name: 'Query all images',
            query: `
                query {
                    images {
                        id
                        url
                    }
                }
            `,
        },
        // Query a single image by ID (replace with an actual ID)
        {
            name: 'Query a single image by ID',
            query: `
                query {
                    image(id: "ea4be732-ebe3-4aa8-afbb-e5c1894f719b") {
                        id
                        url
                    }
                }
            `,
        },
        // Create a new image
        {
            name: 'Create a new image',
            query: `
                mutation CreateImage($input: CreateImageInput!) {
                    createImage(input: $input) {
                        id
                        url
                    }
                }
            `,
            variables: {
                input: {
                    url: "http://example.com/new-image.jpg",
                    priority: 100
                }
            }
        },
        // Update an image (replace with an actual ID)
        {
            name: 'Update an image',
            query: `
                mutation UpdateImage($id: String!, $input: UpdateImageInput!) {
                    updateImage(id: $id, input: $input) {
                        id
                        url
                    }
                }
            `,
            variables: {
                id: "ea4be732-ebe3-4aa8-afbb-e5c1894f719b",
                input: {
                    url: "http://example.com/updated-image.jpg",
                    priority: 200
                }
            }
        },
        // Delete an image (replace with an actual ID)
        {
            name: 'Delete an image',
            query: `
                mutation DeleteImage($id: String!) {
                    deleteImage(id: $id)
                }
            `,
            variables: {
                id: "ea4be732-ebe3-4aa8-afbb-e5c1894f719b"
            }
        }
    ];
    

    for (const { name, query, variables } of operations) {
        try {
            const data = await performGraphQLOperation(query, variables);
            results += `SUCCESS - ${name}: ${JSON.stringify(data)}\n`;
        } catch (error) {
            results += `ERROR - ${name}: ${error.message}\n`;
        }
    }

    fs.writeFileSync('apiTestResults-graphql.txt', results);
    console.log('GraphQL API test results saved to apiTestResults-graphql.txt');
};

testGraphQLEndpoints();
