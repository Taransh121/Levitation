const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Product = require("../Models/ProductModel");

exports.addProduct = async (req, res) => {
    try {
        const { name, price, qty } = req.body;
        const product = await Product.findOne({ name });
        if (product) {
            res.status(400).json({ msg: "Product already exists" });
        } else {
            const newProduct = new Product({
                name, price, qty
            });
            const savedProduct = await newProduct.save();
            return res.status(200).json({ savedProduct });
        }
    } catch (error) {
        return res.status(400).json(error);
    }
};

