const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ProductSchema = new Schema({
    title:{type: String},
    price:{type: Number},
    image:{type: String},
})

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;