const mongoose = require('mongoose');

const { Schema } = mongoose;

const orderSchema = new Schema({
  purchaseDate: {
    type: Date,
    default: Date.now
  },
  shipTo: {
    type: String,
    required: true
  },
  shipToAddress: {
    type: String,
    required: true
  },
  message: {
    type: String,
    maxlength: 300
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
