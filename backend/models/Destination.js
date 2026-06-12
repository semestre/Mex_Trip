const mongoose = require('mongoose');

const DestinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    description: {
        type: String
    },

    duration: {
        type: String,
        required: true
    },

    pointA: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },

    pointB: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    },

    schedule: {
        type: String
    },

    car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car',
        required: true
    }
});

module.exports = mongoose.model('Destination', DestinationSchema);

// {
//   "_id": "...",
//   "name": "Centro Histórico Tour",
//   "description": "Tour por el centro de León",
//   "duration": "45 minutes",

//   "pointA": {
//     "latitude": 21.1223,
//     "longitude": -101.6821
//   },

//   "pointB": {
//     "latitude": 21.1523,
//     "longitude": -101.7021
//   },

//   "schedule": "09:00 - 18:00",

//   "car": "6848f7b12a3c456789abcdef"
// }