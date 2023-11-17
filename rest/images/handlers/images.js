const Image = require('../../../utils/images');

const getAllImages = async (req, res) => {
    try {
        const images = await Image.find({});
        res.json(images);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const getImageById = async (req, res) => {
    try {
        const image = await Image.findOne({ id: req.params.imageId });
        if (!image) {
            return res.status(404).send('Image not found');
        }
        res.json(image);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const createImage = async (req, res) => {
    try {
        const newImage = new Image(req.body);
        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateImage = async (req, res) => {
    try {
        const updatedImage = await Image.findOneAndUpdate({ id: req.params.imageId }, req.body, { new: true });
        if (!updatedImage) {
            return res.status(404).send('Image not found');
        }
        res.json(updatedImage);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const deleteImage = async (req, res) => {
    try {
        const image = await Image.findOneAndDelete({ id: req.params.imageId });
        if (!image) {
            return res.status(404).send('Image not found');
        }
        res.send('Image deleted');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

module.exports = {
    getAllImages,
    getImageById,
    createImage,
    updateImage,
    deleteImage
};