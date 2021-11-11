const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin');
const Post = mongoose.model("Post");




router.post('/createpost', requireLogin, (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(422).json({ error: "Please add all the necessary field" });
    }
    req.user.password = undefined //so that its doesnt shwo up the user password along with its posted by details;
    const post = new Post({
        title: title, //if key and value are same they can be wrritten only once

        body,//"body:body"......is same as only "body"
        postedBy: req.user
    });
    post.save().then(result => {
        res.json({ post: result });

    })
        .catch(err => { console.log(err) });
});


module.exports = router;