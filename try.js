const express = require("express");
const  mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const app= express();
mongoose
    .connect("mongodb://localhost/xlenzNode", { useNewUrlParser: true })
    .then(() => console.log("connected..."))
    .catch(err => console.error("could not connect"))
app.use(express.json)
app.get('/',(req,res)=>
{
    res.send({message:"welcome to nodejson and mongodb"})
})
const port = 3001
app.listen