var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name:{
        type: String,
        required : true,
        unique:true
    },
    description:{
        type : String,
        required : true
    },
    products :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Product',
        index : false,
        id : false
    }]
},{timestamps : true});

var category = mongoose.model('Category',categorySchema);
module.exports = category;