const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);

// {
//   "_id": "...",
//   "username": "saray",
//   "email": "saray@email.com",
//   "password": "$2b$10$..."
// }