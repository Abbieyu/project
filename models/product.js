var mongoose = require('mongoose');
require('mongoose-currency').loadType(mongoose);
var Currency = mongoose.Types.Currency;

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required : true,
        unique:true
    },
    description : {
        type : String
    },
    image : {//to be edited
        type : String
    },
    price : {
        type : Currency,
        required: true
    },
    company : {//to be edited
        type : String
    }
})

// Getter
productSchema.path('price').get(function(num) {
    console.log('getter');
    console.log((num/100).toFixed(2));
    return (num / 100).toFixed(2);
  });
  
//   // Setter
// productSchema.path('price').set(function(num) {
//     return num * 100;
//   });

var product = mongoose.model('Product',productSchema);
module.exports = product;