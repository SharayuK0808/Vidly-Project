const express=require('express');
const router= express.Router();
const Joi= require('joi');
const boolean = require('joi/lib/types/boolean');
const number = require('joi/lib/types/number');
const mongoose=require('mongoose');


const customerSchema=new mongoose.Schema({
    name : {
        type: String,
        required : true,
        minlength:2,
        maxlength:10
    
    },
    isGold: {
        type: Boolean,
        default:false
    },
    phone : {
        type : Number,
        required :true,
        minlength :8,
        maxlength: 10,
    }

})

const Customer=mongoose.model('Customer',customerSchema);
// const genres=[{id:1,name:'Rom-Com'},
//     {id:2,name:'Thriller'}
//     ];

router.get('/',async(req,res)=> {

    const customers=await Customer.find();
    res.send(customers);
})

router.get('/:id',async(req,res)=>{

    const customer=await Customer.findById(req.params.id);
    if(!customer)res.status(400).send('Genre with given ID not found');
    res.send(customer);
})
router.post('/',async(req,res)=>{                            // POST
    
   const {error} = validate(req.body);
   if(error){
       res.status(404).send(error.details[0].message);
       return;
   }
    let customer=new Customer(
        {name: req.body.name},
        {isGold:req.body.isGold},
        {phone:req.body.phone});
    customer=await customer.save();
    res.send(customer);
});
router.delete('/:id',async(req,res) => {    //DELETE
    const customer=await Customer.findByIdAndRemove(req.params.id);
        if(!customer) {
            res.status(404).send('Customer with given is NOT FOUND.');
        return;
        }

        res.send(customer);
})
function validate(customer){
    const schema={
        name: Joi.string().min(3).max(10).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(8).max(10).required()
    };

     return Joi.validate(customer,schema);
}

module.exports =router;