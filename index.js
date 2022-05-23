console.log('Hello Node js')
const express = require('express')
const app = express()
const path = require('path')
const{render, compileFile} = require('pug');
app.use("/style", express.static("public/css/"));

const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/ead2");
const Product = require('./models/Product')

const fileUpload = require('express-fileupload');
app.use(fileUpload());
const bodyParser = require("body-parser");
const { response } = require('express');
// app.use(bodyParser.json())
app.use(express.json())
 app.use(bodyParser.urlencoded({extended:true}));
 //app.use("/images", express.static("public/image"));
 app.use(express.static(path.join(__dirname, "public")));
//  app.use(express.urlencoded())
app.set('view engine', 'ejs')

app.get('/create', function(req, res){
    res.render('create')
})


app.get("/products", async function(req, res){
    const products = await Product.find();
    res.render('products', { products }) ;
})

app.get("/product/getProduct/:pid", async function(req, res){
const pid = req.params.pid;
console.log(pid);
const product = await Product.findById(pid);
    res.render('productDetail', { product })

});

app.post("/products/update/:pid", async function(req, res){
    const pid = req.params.pid; 
    console.log("In update"+pid)
    console.log("In update "+ req.body.title + " "+ req.body.price);
    const prod = await Product.updateMany({ _id: pid }, {$set: {title: req.body.title, price: req.body.price}})  
    console.log("In update "+prod)
    res.redirect("/")
})

app.get("/products/delete/:pid", async function(req, res){
    const pid = req.params.pid; 
    console.log("In delete "+pid) 
    const product = await Product.findByIdAndDelete(pid);
    const products = await Product.find()
    res.render('products', { products }) ;
 
})

app.post('/product/create', function(req, res){
    
    console.log("In file upload "+req.files);
    Product.create(req.body, function(err, product){
        console.log(product)
        res.redirect("/products")
    });
})


//Delete



//Pug
// app.all('/blog', function(req,res){
// const func = compileFile("views/heading.pug");
// console.log(func({ name: "Aariz Ali" }));
// console.log(func({ name: "Asad Ali" }));
// const products = ['A','B']
//  res.render('blog', {name: 'Megha', products});
// })




app.get('/', function(req, res) {
     console.log(__dirname)
    //  res.sendFile(path.resolve(__dirname, 'index.html'))
    const products = ['A', 'B', 'C']
    res.render('index', {name:'MK', products})
    // res.status(200).json({result:'success'})
})
app.get('/about', function(req, res){
    res.render('about')
})


app.use('*', function(req, res){
    res.status(404).json({msg: 'Not Found'})
})

app.listen(3000, function(req, res){
    console.log('listening on 3000 port')
})