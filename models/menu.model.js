const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
        name: String,
        description: String,
        price: Number,
        image: String
})

const menuModel = mongoose.model('menu',menuSchema);

module.exports = {
    menuModel
}