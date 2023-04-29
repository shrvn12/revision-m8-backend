const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { registrationValidator } = require('../middlewares/registration.validator');
const { userModel } = require('../models/user.model');
const { loginValidator } = require('../middlewares/login.validator');

const saltRounds = process.nextTick.saltRounds

const userRouter = express.Router();

userRouter.post('/register',registrationValidator,async (req, res) => {
    const payload = req.body;
    payload.password = await bcrypt.hash(payload.password,+saltRounds);
    const exists = await userModel.findOne({email: payload.email});
    if(exists){
        return res.status(408).send({msg: 'Account already exists'});
    }
    const user = new userModel(payload);
    await user.save();
    res.status(201).send({msg:'Registration successful'});
})

userRouter.post('/login',loginValidator,async (req, res) => {
    const data = req.body;
    const user = await userModel.findOne({email: data.email});
    if(!user){
        return res.status(404).send('Account does not exists');
    }
    // console.log(user);
    bcrypt.compare(data.password,user.password,(err, result) => {
        if(err){
            return res.status(500).send({msg:'Somehting went wrong, please try again'});
        }
        if(!result){
            return res.status(401).send({msg:'Passowrd do not match'});
        }
        const payload = {
        name: user.name,
        email: user.email,
        address: user.address
        }
        const token = jwt.sign(payload,process.env.key);
        res.status(202).send({msg:'Login successful', token});
    })
})

userRouter.patch('/user/:id/reset',async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if(!data.currentPassword || !data.newPassword){
        return res.status(402).send({msg:'Please provide currentPassword and newPassword'});
    }
    const user = await userModel.findById(id);
    if(!user){
        return res.status(404).send('Account does not exists');
    }
    bcrypt.compare(data.currentPassword,user.password,async (err, result) => {
        if(err){
            return res.status(500).send({msg:'Somehting went wrong, please try again'});
        }
        if(result){
            const payload = {password: await bcrypt.hash(data.newPassword,+saltRounds)};
            await userModel.findByIdAndUpdate(id, payload);
            res.status(202).send({msg:'Password updated'});
        }
        else{
            res.status(401).send({msg:'Incorrect current password'});
        }
    })
})

module.exports = {
    userRouter
}