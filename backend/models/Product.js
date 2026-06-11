const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Product', ProductSchema);

// {
//   "_id": "...",
//   "name": "Notebook",
//   "description": "College notebook 100 pages",
//   "price": 35
// }