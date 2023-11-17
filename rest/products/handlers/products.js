const Product = require('../../../utils/products'); 
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findOne({ id: req.params.productId });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.json(product);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findOneAndUpdate({ id: req.params.productId }, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).send('Product not found');
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ id: req.params.productId });
        if (!product) {
            return res.status(404).send('Product not found');
        }
        res.send('Product deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
