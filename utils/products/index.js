const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true, index: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  status: { 
    type: String, 
    required: true, 
    enum: ['active', 'inactive'] 
  },
  images: [{ type: String }], 
}, { collection: 'product' });

module.exports = mongoose.model('Product', productSchema);
