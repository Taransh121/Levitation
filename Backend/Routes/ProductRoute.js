const express = require("express");
const { addProduct } = require("../Controllers/ProductController");
const router = express.Router();

router.post("/addProduct", addProduct);

module.exports = router;
