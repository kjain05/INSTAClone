const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//creating our "User" model 
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');
const requireLogin = require('../middleware/requireLogin');
// router.get("/protected", requireLogin, (req, res) => {
//     res.send("Hello");
// });

router.post("/signup", (req, res) => {
    //console.log(req.body.name);
    const { name, email, password } = req.body;

    //all three fields must be filled
    if (!name || !email || !password) {
        return res.status(422).json({ error: "Please fill all the fields!" })//basically return is used when we find some code error or a point in program fater which we dont want program to execute any further...
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
                    password: hashedpassword,
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
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
                        res.json({ token });
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