//Imports
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv"); //For using process.env
const app = express();
const PORT = 8080;
const authRoutes = require("./Routes/AuthRoute")
const productRoutes = require("./Routes/ProductRoute")
const invoiceRoutes = require("./Routes/invoiceRoute")


//Configurations
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Routes
app.use("/user", authRoutes);
app.use("/product", productRoutes);
app.use("/invoice", invoiceRoutes);


//Database
mongoose.set('strictQuery', false);
// const mongoURL = `mongodb+srv://Taransh:${process.env.MONGODB_PASSWORD}@cluster0.eq8d4zf.mongodb.net/Loginn?retryWrites=true&w=majority`;
const mongoURL = `mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.1vnhs.mongodb.net/Project?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(mongoURL)
    .then(() => {
        console.log("Database connected");
    }).catch((error) => {
        console.log(error);
    });


app.listen(PORT, () => {
    console.log(`Server running at PORT - ${PORT}`);
});