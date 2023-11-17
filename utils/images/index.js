const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  id: { type: String, default: uuidv4, unique: true, index: true },
  url: { type: String, required: true },
  priority: { type: Number, required: true }
},  { collection: 'image' });

module.exports = mongoose.model('Image', imageSchema);
