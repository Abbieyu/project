const express = require('express');
const bodyParser = require('body-parser');
const productRouter = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');
productRouter.use(bodyParser.json());

productRouter.route('/')
.get((req,res,next)=>{
    console.log('get');
    Product.find({})
    .then((products)=>{
        if(products.length!=0){
        console.log('get on /product');
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.send(products);
        }
        else {
            var err = new Error();
            err.message="There are no categories";
            err.status = 404;
            res.statusCode=404;
            res.send(err);
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    console.log('post on /product');
    Product.create(req.body)
    .then((product)=>{
        console.log('product created :'+product);
        res.statusCode = 200;
        res.setHeader('content-type','application/json');
        //product.price = ((product.price)/100).toFixed(2);
        //console.log(((product.price)/100).toFixed(2));
        res.send(product);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.put((req,res,next)=>{
    console.log('put on /product')
    res.statusCode = 403;
    res.setHeader('content-type','application/json');
    res.send('Put operation is not supported on /products');
})
.delete((req,res,next)=>{
    console.log('delete on /product');
    Product.remove({})
    .then((result)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.send(result);
    },(err)=>next(err))
    .catch((err)=>next(err));
})

productRouter.route('/:prodId')
.get((req,res,next)=>{
    console.log('get on /products/:prodId');
    Product.findById(req.params.prodId)
    .then((product)=>{
        if(product){
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.send(product);
        }
        else {
            var err = new Error('This product does not exist');
            err.status=404;
            next(err);}
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.post((req,res,next)=>{
    console.log('post on /products/:prodId');
    res.statusCode = 403;
    res.setHeader('content-type','application/json');
    res.send('POST operation is not supported on /products/prodId');
})
.put((req,res,next)=>{
    console.log('put on /products/:prodId');
    Product.findByIdAndUpdate(req.params.prodId,{$set:req.body
    },{new:true})
    .then((product)=>{
        if(product){
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        console.log('product '+product._id+' updated successfully');
        res.send(product);
        }
        else {
            var err = new Error('this product does not exist');
            err.status=404;
            next(err);
        }
    },(err)=>next(err))
    .catch((err)=>next(err));
})
.delete((req,res,next)=>{
    console.log('delete on /products/:prodId');
    Product.findByIdAndRemove(req.params.prodId)
    .then((result)=>{
        res.setHeader('content-type','application/json');
        res.statusCode=200;
        res.send(result);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
module.exports =productRouter;