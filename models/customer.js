var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
    firstname:{
        type: String
    },
    lastname:{
        type: String
    },
    email:{
        type: String,
        required: true
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
        type : mongoose.Schema.Types.ObjectId
    },
    admin:{
        type : Boolean,
        default : false
    }
})