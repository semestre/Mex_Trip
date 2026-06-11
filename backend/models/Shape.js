const mongoose = require('mongoose');

const ShapeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    points: [
        {
            latitude: {
                type: Number,
                required: true
            },
            longitude: {
                type: Number,
                required: true
            }
        }
    ]
});

module.exports = mongoose.model('Shape', ShapeSchema);

// {
//   "_id": "...",
//   "name": "School Zone",
//   "points": [
//     {
//       "latitude": 21.123,
//       "longitude": -101.456
//     },
//     {
//       "latitude": 21.124,
//       "longitude": -101.457
//     },
//     {
//       "latitude": 21.125,
//       "longitude": -101.458
//     }
//   ]
// }