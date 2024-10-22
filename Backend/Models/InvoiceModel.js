const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product', // Reference to the Product model
                required: true,
            },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true }, // You can store price at invoice time
        },
    ],
    date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Invoice', invoiceSchema);
