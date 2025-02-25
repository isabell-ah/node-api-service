const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Please enter product name'],
  },
  quantity: {
    type: String,
    default: 1,
  },
});

const Products = mongoose.model('Product', productSchema);

module.exports = Products;
