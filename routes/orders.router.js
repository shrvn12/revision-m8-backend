const express = require('express');
const { orderModel } = require('../models/order.model');
const { userModel } = require('../models/user.model');
const { restaurantModel } = require('../models/restaurant.model');

const orderRouter = express.Router();

orderRouter.post('/',async (req, res) => {
    let {email, restaurant, items, totalPrice, deliveryAddress} = req.body
    let payload = {email, restaurant, items, totalPrice, deliveryAddress};
    
    for(let key in payload){
        if(!payload[key]){
            return res.status(402).send({msg:`Please provide ${key}`});
        }
    }

    deliveryAddress = {
        street: payload.deliveryAddress.street,
        city: payload.deliveryAddress.city,
        state: payload.deliveryAddress.state,
        country: payload.deliveryAddress.country,
        zip: payload.deliveryAddress.zip
    }

    for(let key in deliveryAddress){
        if(!deliveryAddress[key]){
            return res.status(402).send({msg:`Please provide ${key} in address`})
        }
    }

    for(let elem of items){
        if(!elem.name || !elem.price || !elem.quantity){
            return res.status(402).send({msg:'Please provide name, price and quanitiy for each elment'});
        }
    }

    const user = await userModel.findOne({email});
    if(!user){
        return res.status(404).send({msg:'email is not registered'});
    }
    const Restaurant = await restaurantModel.findOne({name: restaurant});

    if(!Restaurant){
        return res.status(404).send({msg:'Restaurant not found'});
    }

    const data = {user, restaurant:Restaurant, items, totalPrice, deliveryAddress, status:'placed'};

    const order = new orderModel(data);
    await order.save();
    res.status(201).send({msh:'Order placed'});
})

orderRouter.get('/',async (req, res) => {
    const order = await orderModel.find();
    res.send(order);
})

orderRouter.get('/:id',async (req, res) => {
    if(req.params.id.length !== 24){
        return res.status(402).send({msg:'Invalid ID'});
    }
    const order = await orderModel.findById(req.params.id);
    res.send(order);
})

orderRouter.patch('/:id',async (req, res) => {
    if(req.params.id.length !== 24){
        return res.status(402).send({msg:'Invalid ID'});
    }
    const {status} = req.body;
    if(!status){
        return res.send("Please provide status to be updated");
    }

    if(status !== "placed" && status !== "delivered" && status !== "preparing" && status !== 'on the way'){
        return res.status(402).send({msg:'Invalid status \n valid values: ["placed", "preparing", "on the way", "delivered"]'});
    }

    await orderModel.findByIdAndUpdate(req.params.id,{status});
    res.sendStatus(204);
})

module.exports = {
    orderRouter
}

/* 
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
*/