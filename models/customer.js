var mongoose = require('mongoose');

var customerSchema = new mongoose.Schema({
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    email:{
        type: String,
        required: true,
        unique : true
    },
    password:{
        type: String,
        required: true
    },
    address :{
        type : String
    },
    DOB :{
        type: Date
    },
    cart : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Cart'
    },
    admin:{
        type : Boolean,
        default : false
    }
},
    {timestamps : true
});


var Customer = mongoose.model('Customer',customerSchema);
module.exports = Customer;