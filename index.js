const express = require('express');
const app = express();
const UserController = require("./controller/UserController");
const ProductController = require("./controller/ProductController");
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/mid");
const path = require('path');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.get("/create", ProductController.create);
app.get("/products", ProductController.getProducts);

app.get("/products/delete/:id", ProductController.deleteProduct);
app.post("/create/products", ProductController.createProduct);
app.get("/products/getProduct/:id", ProductController.getSingleProduct)
app.post("/products/update/:id", ProductController.updateProduct)
console.log('Hello node js');


app.listen(3000, function(req, res){
    console.log('Server is listening on port 3000')
})