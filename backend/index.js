const express = require('express');
var cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoute = require('./routes/auth');
const imageRoute = require('./routes/image');

var app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN
}));

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

(async function () {
    try {
        await mongoose.connect(process.env.MONGO_URL, clientOptions);
        console.log("You successfully connected to MongoDB!");
    } catch (e) {
        console.log(e)
    }
})()

app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
})

app.use('/api/auth', authRoute);
app.use('/api/gallery', imageRoute);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})
