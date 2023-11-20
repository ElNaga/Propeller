


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
    const date = new Date();
    let results = '';
    let createdProductId;
    let createdImageId;

    const createProductOperation = {
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
                images: [] // Add image IDs if needed
            }
        }
    };

    const createImageOperation = {
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
    };

    try {
        const productData = await performGraphQLOperation(createProductOperation.query, createProductOperation.variables);
        createdProductId = productData.data.createProduct.id;
        results += `SUCCESS - ${createProductOperation.name}: ${JSON.stringify(productData)}\n`;
    } catch (error) {
        results += `ERROR - ${createProductOperation.name}: ${error.message}\n`;
    }

    // Create a new image and capture its ID
    try {
        const imageData = await performGraphQLOperation(createImageOperation.query, createImageOperation.variables);
        createdImageId = imageData.data.createImage.id;
        results += `SUCCESS - ${createImageOperation.name}: ${JSON.stringify(imageData)}\n`;
    } catch (error) {
        results += `ERROR - ${createImageOperation.name}: ${error.message}\n`;
    }

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
        // Query a single product 
        {
            name: 'Query a single product by ID',
            query: `
                query GetSingleProduct($id: String!) {
                    product(id: $id) {
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
            variables: {
                id: createdProductId
            }
        },
        // Update a product 
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
                id: createdProductId,
                input: {
                    name: "Updated Product",
                    price: 25.99,
                    status: "inactive",
                    images: [] // Update image IDs if needed
                }
            }
        },
        // Delete a product 
        {
            name: 'Delete a product',
            query: `
                mutation DeleteProduct($id: String!) {
                    deleteProduct(id: $id)
                }
            `,
            variables: {
                id: createdProductId
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
        // Query a single image b
        {
            name: 'Query a single image by ID',
            query: `
                query GetSingleImage($id: String!) {
                    image(id: $id) {
                        id
                        url
                    }
                }
            `,
            variables: {
                id: createdImageId
            }
        },
        // Update an image 
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
                id: createdImageId,
                input: {
                    url: "http://example.com/updated-image.jpg",
                    priority: 200
                }
            }
        },
        // Delete an image with provided ID
        {
            name: 'Delete an image',
            query: `
                mutation DeleteImage($id: String!) {
                    deleteImage(id: $id)
                }
            `,
            variables: {
                id: createdImageId
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

    fs.writeFileSync('apiTestResults-graphql.txt', results, { flag: 'a' });
    fs.writeFileSync('apiTestResults-graphql.txt', `Tests were done on: ${date}\n\n`, { flag: 'a' });
    console.log('GraphQL API test results saved to apiTestResults-graphql.txt');
};

testGraphQLEndpoints();