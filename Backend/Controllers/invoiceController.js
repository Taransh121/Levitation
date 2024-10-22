const Invoice = require('../Models/InvoiceModel'); // Import the Invoice model
const User = require('../Models/UserModel'); // Import the User model
const Product = require('../Models/ProductModel'); // Import the Product model
const puppeteer = require('puppeteer');

// Controller to generate invoice
exports.generateInvoice = async (req, res) => {
    const { products } = req.body;

    // Ensure the products exist in the database
    const productDetails = await Product.find({ _id: { $in: products.map(prod => prod.productId) } });

    if (productDetails.length !== products.length) {
        return res.status(400).send('Some products not found');
    }

    // Prepare the products for saving
    const invoiceProducts = products.map(prod => ({
        productId: prod.productId,
        quantity: prod.quantity,
        price: productDetails.find(p => p._id.toString() === prod.productId).price,
    }));

    // Save invoice data to MongoDB
    const invoice = new Invoice({
        userId: req.user.id,
        products: invoiceProducts,
    });

    await invoice.save();

    // Send product details and user information back to the frontend
    const response = {
        userId: req.user.id,
        date: new Date().toLocaleDateString(),
        products: invoiceProducts.map(item => ({
            _id: item.productId,
            name: productDetails.find(p => p._id.toString() === item.productId).name,
            quantity: item.quantity,
            price: item.price,
        })),
    };

    res.status(200).json(response);
};
