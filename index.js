const express = require('express');
const cors = require('cors');

const { connection } = require('./configs/db');
const { userRouter } = require('./routes/user.routes');
const { restaurantsRouter } = require('./routes/restaurants.router');
const { orderRouter } = require('./routes/orders.router');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/',(req, res) => {
    res.status(200).send({msg:'Basic API endpoint'});
})

app.use('/api',userRouter);

app.use('/api/restaurants', restaurantsRouter);
app.use('/api/orders',orderRouter);

app.listen(process.env.port,async () => {
    try {
        await connection;
        console.log('Connected to DB 🌿');
    }
    catch (error) {
        console.log('Error while connecting to DB ⚠️');
    }
    console.log(`Running at ${process.env.port}🏃🏻‍♂️`);
})