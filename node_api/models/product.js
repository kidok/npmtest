var restful = require('node-restful');
var mongoose = restful.mongoose;

// {
//   "name": "lenovo T430",
//   "sku": "34-331-345",
//   "price": 299.99
// }

var productSchema = new mongoose.Schema({
    name: String,
    sku: String,
    price: Number
});

module.exports = restful.model('Products', productSchema);
