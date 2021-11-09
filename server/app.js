const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
require('./models/user');

// KREyYPJr3q!n.YN


app.listen(port, () => {

    console.log("SERVER running on ", port);
});