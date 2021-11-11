const express = require('express');
const app = express();
const port = 5000;
const mongoose = require('mongoose');
const {MONGOURI} = require('./keys');
require('./models/user');

//parse
app.use(express.json());
//requiring router file
app.use(require('./route/authentication'));

//connecting to mogoose database
mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
    console.log("connected to mongo successfully!");
})

//logging  error on console
mongoose.connection.on('error',(err)=>{
    console.log("sorry,can't connect!",err);
})

// KREyYPJr3q!n.YN
//database user password(username: Suraj) PwgUP0nej6DFMsji

app.listen(port, () => {

    console.log("SERVER running on ", port);
});