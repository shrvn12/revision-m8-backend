const mongoose = require('mongoose');
 const orderSchema = mongoose.Schema({
    user : { type: Object},
    restaurant : { type: Object},
    items: [{
        name: String,
        price: Number,
        quantity: Number
    }],
    totalPrice: Number,
    deliveryAddress: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    status: String // e.g, "placed", "preparing", "on the way", "delivered"
})

const orderModel = mongoose.model('orders',orderSchema);

module.exports = {
    orderModel
}