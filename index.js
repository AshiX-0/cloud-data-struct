const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const bodyParser = require('body-parser');
const router = require('./locations/locations.controller');

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(async ()=>{
        console.log('Successful connection to the database');
        const app = express();
        const port = process.env.port || 1337;
        app.use(express.json())
        app.use(bodyParser.urlencoded({extended:true}));

        app.use(router);
        app.get('/', (req,res)=>{
            res.send('Online');
        })
        app.use((err,req,res,next)=>{res.status(500 || err.status).send(err.message || 'Internal server error')});
        app.listen(port, ()=> {console.log(`Server running, listening to port ${port}. Go to http://localhost:${port}`);});
    })
    .catch((err)=>{
        console.error('Connection error : ', err.message);
        process.exit();
    })

