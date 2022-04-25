const express=require('express');
const router= express.Router();
const Joi= require('joi');
const mongoose=require('mongoose');


const genreSchema=new mongoose.Schema({
    name : {
        type: String,
        required : true,
        minlength:2,
    
    }

})

const Genre=mongoose.model('Genre',genreSchema);
// const genres=[{id:1,name:'Rom-Com'},
//     {id:2,name:'Thriller'}
//     ];

router.get('/',async(req,res)=> {

    const genres=await Genre.find();
    res.send(genres);
})

router.get('/:id',async(req,res)=>{

    const genre=await Genre.findById(req.params.id);
    if(!genre)res.status(400).send('Genre with given ID not found');
    res.send(genre);
})
router.post('/',async(req,res)=>{                            // POST
    
   const {error} = validate(req.body);
   if(error){
       res.status(404).send(error.details[0].message);
       return;
   }
    let genre=new Genre({name: req.body.name});
    genre=await genre.save();
    res.send(genre);
});

router.put('/:id',async(req,res) => {           //PUT

    const {error} = validate(req.body);
        if(error){
            res.status(404).send(error.details[0].message);
            return;
        }
     const genre=await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true})
        if(!genre) {
            res.status(404).send('Genre with given is NOT FOUND.');
        return;
        }
        res.send(genre);

})

router.delete('/:id',async(req,res) => {    //DELETE
    const genre=await Genre.findByIdAndRemove(req.params.id);
        if(!genre) {
            res.status(404).send('Genre with given is NOT FOUND.');
        return;
        }

        res.send(genre);
})

function validate(genre){
    const schema={
        name: Joi.string().min(3).required()
    };

     return Joi.validate(genre,schema);
}

module.exports =router;