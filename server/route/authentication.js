const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//creating our "User" model 
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');

router.get("/", (req, res) => {
    res.send("Hello");
})

router.post("/signup", (req, res) => {
    //console.log(req.body.name);
    const { name, email, password } = req.body;

    //all three fields must be filled
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields!" })
    }

    User.findOne({ email: email }).then((savedUser) => {
        //savedUser parameter gives us the name of our current user trying to signup
        //if user already exists

        //console.log(savedUser); output: e.g virat
        if (savedUser) {
            return res.status(422).json({ error: "user already exists with that email" })
        }

        bcrypt.hash(password, 15)
            .then(hashedpassword => {

                //else,create a new "User" using our User schema
                const user = new User({
                    email: email,
                    password: password,
                    name: name
                })
                //save the newly created "user" object
                user.save()
                    //callback to execute when promise is fullfilled
                    .then((user) => {
                        res.json({ message: "saved successfully" })
                    })
                    //callback to execute when promise is rejected
                    .catch(err => {
                        console.log(err);
                    })
            })

    })
        //callback to execute when promise is rejected
        .catch(err => {
            console.log(err);
        })

})

//for signin page
router.post("/signin", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({ error: "Please enter Email or Password" });
    }

    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid Email or Password" })
            }

            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        return res.json({ message: "successfully signed in" })
                    }
                    else {
                        return res.status(422).json({ error: "Invalid Email or Password" })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        })
})



module.exports = router;