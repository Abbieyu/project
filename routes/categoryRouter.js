var mongoose = require('mongoose');
var express = require('express');
var bodyparser = require('body-parser');
var Category = require('../models/category');
var Product = require('../models/product');
var categoryRouter = express.Router();
categoryRouter.use(bodyparser.json());

categoryRouter.route('/')
.get((req,res,next)=>{
    console.log('GET on /categories');
    Category.find({})
    .populate('products')
    .then((categories)=>{
        console.log(categories);
        if(categories.length!=0){
            console.log('in get categories');
            res.statusCode = 200;
            res.setHeader('content-type','application/json');
            res.send(categories);
        }
        else{
            var err = new Error();
            err.message='There are no categories';
            err.status = 404;
            res.status(404);
            res.json(err);
        }
    },((err)=>next(err)))
    .catch((err)=>next(err))
})
.post((req,res,next)=>{
    console.log('POST on /categories');
    var flag = false;
    var err = new Error();
    var productsArr=[""];
    err.status=404;
    var array =[""];
    req.body.products.forEach(product => {
        array.push(Product.findById(product)
        .then((result)=>{
            console.log(product);
            if(result==null)
            {
                flag = true
                productsArr.push(product);
                console.log(productsArr);
            }
        }))
    })
    Promise.all(array)
    .then((result)=>{
    if(flag  == true){
        res.statusCode=404;
        var dummy = productsArr;
        console.log('arry:'+dummy);
        err.mesage=dummy+' does not exist';
        res.send(err);
    }
    if(flag =false){
    Category.create(req.body)
    .then((cat)=>{
        console.log(cat);
        //console.log(req.body.products);
        //cat.Products=req.body.Products;
        res.statusCode = 200;
        res.setHeader('content-type','application/json');
        res.send(cat);
    },((err)=>next(err)))
    .catch((err)=>next(err));
}})
})
.put((req,res,next)=>{
    console.log('PUT on /categories');
    res.statusCode=403;
    res.setHeader('content-type','application/json');
    res.send('PUT operation is not allowed on /categories');
})
.delete((req,res,next)=>{
    console.log('DELETE on /categories');
    Category.remove({})
    .then((result)=>{
        res.statusCode = 200;
        res.setHeader('content-type','application/json');
        res.send(result);
    },(err)=>next(err))
    .catch((err)=>next(err));
})
module.exports = categoryRouter;