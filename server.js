const express = require('express')
const app = express()

console.log("Go to localhost:3000");

app.get('/', function(req, res){
    res.send("Hello world!");
 });
 
 app.listen(3000);