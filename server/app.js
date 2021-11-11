const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const { MONGOURI } = require('./keys');
require('./models/user');



//connecting to mogoose database
mongoose.connect(MONGOURI);

mongoose.connection.on('connected', () => {
    console.log("connected to mongo successfully!");
});

//logging  error on console
mongoose.connection.on('error', (err) => {
    console.log("sorry,can't connect! ", err);
});

require('./models/user');
require('./models/post');

//parse
app.use(express.json());
//requiring router file
app.use(require('./route/authentication'));
app.use(require('./route/post'));

app.listen(port, () => {

    console.log("SERVER running on ", port);
});