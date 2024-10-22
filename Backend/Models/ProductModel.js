const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 20
    },
    price: {
        type: Number,
        required: true,
    },
    qty: {
        type: Number,
        required: true,
        min: 1
    },
}, { timeStamps: true });

module.exports = mongoose.model('Product', productSchema);