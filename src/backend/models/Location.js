const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Location', LocationSchema);

// {
//   "_id": "...",
//   "name": "Hospital General",
//   "description": "Emergency services available",
//   "latitude": 21.1223,
//   "longitude": -101.6821
// }