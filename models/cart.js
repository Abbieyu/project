var mongoose = require('mongoose');

var cartSchema = new mongoose.Schema({
    products :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : 'Product',
            index : false,
            id : false
        }
    ],
    customer :{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Customer',
        autopopulate: true
    }
},{timestamps: true});

var Cart = mongoose.model('Cart',cartSchema);
module.exports = Cart;