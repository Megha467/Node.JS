const mongoose = require('mongoose');

const Schema = mongoose.Schema
const ProductSchema = new Schema({ 
price: {type: Number, required: true}, 
title: {type: String, required: true}, image: {type: String}})

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;