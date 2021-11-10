const express=require('express');
const router =express.Router();
const mongoose = require('mongoose');
//creating our "User" model 
const User = mongoose.model("User");

router.get("/",(req,res)=>{
    res.send("Hello");
})

router.post("/signup",(req,res)=>{
    //console.log(req.body.name);
    const {name,email,password}=req.body;

    if(!name || !email || !password){
       return res.status(422).json({error: "Please fill all the fields!"})
    }

    /*else{
        res.json({message:"successfully posted!"});
    }*/
    User.findOne({email:email}).then((savedUser)=>{
        if(savedUser){
            return res.status(422).json({error:"user already exists with that email"})
        }

        const user= new User({
            email,
            password,
            name
        })

        user.save()
        .then((user)=>{
            res.json({message:"saved successfully"})
        })
    }

)

module.exports= router;