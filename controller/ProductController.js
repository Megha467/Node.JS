const { render } = require('ejs');
const Product = require('../models/Product');

const create = (req, res) =>{
    res.render("create");
}

const getProducts = async function (req, res) {
    const products = await Product.find();
    res.render("products", {products})
}

const getSingleProduct = async function (req, res) {
    const id = req.params.id;
    const product = await Product.findById(id)
    res.render("singleProduct", {product})
}

const updateProduct = async function(req, res){
    const id = req.params.id;
    console.log("In update" + req.body.title)
    console.log("In update "+ req.body.title + " "+ req.body.price);
    // const prod = await Product.updateMany({ _id: id }, {$set: {title: req.body.title, price: req.body.price}})  
    const prod = await Product.updateMany({_id: id}, {$set: {title: req.body.title, price: req.body.price, image: req.body.image}})
   
    res.redirect("/products")
}

const createProduct = (req, res) => {
Product.create(req.body, function(err, product){
console.log(product)
res.redirect("/products");
})
}

const deleteProduct = async function(req, res) {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);
    const products = await Product.find();
    res.redirect("/products")
    // res.render("products", {products})
}

module.exports = {create, getProducts, createProduct, deleteProduct, getSingleProduct, updateProduct}