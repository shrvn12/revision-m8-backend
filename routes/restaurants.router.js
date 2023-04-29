const express = require('express');
const { restaurantModel } = require('../models/restaurant.model');
const { menuModel } = require('../models/menu.model');

const restaurantsRouter = express.Router();

restaurantsRouter.get("/",async (req, res) => {
    const data = await restaurantModel.find();
    res.status(200).send({size:data.length, data});
})

restaurantsRouter.get("/:id",async (req, res) => {
    if(req.params.id.length !== 24){
        return res.status(402).send({msg:'Invalid ID'});
    }
    const data = await restaurantModel.findById(req.params.id);
    res.status(200).send(data);
})


restaurantsRouter.get("/:id/menu",async (req, res) => {
    if(req.params.id.length !== 24){
        return res.status(402).send({msg:'Invalid ID'});
    }
    const data = await restaurantModel.findById(req.params.id);
    res.status(201).send(data.menu);
})

restaurantsRouter.post("/:id/menu",async (req, res) => {
    if(req.params.id.length !== 24){
        return res.status(402).send({msg:'Invalid ID'});
    }
    const {name, description, price, image} = req.body;

    const payload = {name, description, price, image};

    for(let key in payload){
        if(!payload[key]){
            return res.status(402).send({msg:`Please provide ${key}`});
        }
    }

    const menu = new menuModel(payload);
    const id = menu.id;
    await menu.save();

    const restaurant = await restaurantModel.findById(req.params.id);
    restaurant.menu.push(menu);
    await restaurantModel.findByIdAndUpdate(req.params.id,restaurant);
    res.status(201).send({msg: 'Menu created 🍽️'});
})

restaurantsRouter.delete("/:id/menu/:menuid",async (req, res) => {
    if(req.params.id.length !== 24 || req.params.menuid.length !== 24){
        return res.status(402).send({msg:'Invalid ID'});
    }

    const restaurant = await restaurantModel.findById(req.params.id);
    let arr = [];
    for(let elem of restaurant.menu){
        if(elem.id !== req.params.menuid){
            arr.push(elem);
        }
    }
    // console.log(arr[0].id);
    restaurant.menu = arr;

    await restaurantModel.findByIdAndUpdate(req.params.id, restaurant);
    
    res.status(202).send({msg:'Menu removed'});

})

restaurantsRouter.post('/add',async (req, res) => {
    let {name, address, menu} = req.body;
    let payload = {
        name, address, menu
    }
    if(!payload.name || !payload.address || !payload.menu){
        return res.status(402).send({msg:'Please provide name, address and menu'});
    }
    address = {
        street: payload.address.street,
        city: payload.address.city,
        state: payload.address.state,
        country: payload.address.country,
        zip: payload.address.zip
    }

    for(let key in address){
        if(!address[key]){
            return res.status(402).send({msg:`Please provide ${key}`});
        }
    }

    const exists = await restaurantModel.find({name: payload.name});
    if(exists){
        return res.status(409).send({msg:'Restaurant has already been added'});
    }

    const restaurant = new restaurantModel(payload);
    console.log(restaurant);
    await restaurant.save();
    res.status(201).send({msg:'Restaurant Added'});
})



module.exports = {
    restaurantsRouter
}