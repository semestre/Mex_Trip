const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number
    },
    capacity: {
        type: Number
    }
});

module.exports = mongoose.model('Car', CarSchema);

// {
//   "_id": "...",
//   "brand": "Toyota",
//   "model": "Hiace",
//   "year": 2022,
//   "capacity": 15
// }