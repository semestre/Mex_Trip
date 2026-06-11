const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(
        'mongodb+srv://saray437933_db_user:sudi@georef711.qjsz2mz.mongodb.net/?retryWrites=true&w=majority&appName=georef711',
    )
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
};

module.exports = connectDB;