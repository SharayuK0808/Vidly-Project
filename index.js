const express= require('express');
const app=express();
const Joi= require('joi');
const mongoose=require('mongoose');
const genres=require('./routes/genres')
const customers=require('./routes/customers')


mongoose.connect('mongodb://localhost/Movies')
    .then(()=> console.log("Connected to DataBase!"))
    .catch(()=> console.log("Couldnt Connect"))

app.use(express.json()); //Middleware to set body parametrs

app.use('/genres',genres);
app.use('/customers',customers);

app.listen(3000,()=>console.log('Server is listening'));
