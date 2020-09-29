const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');

console.log("Go to localhost:3000");
//Allow static files to be served
//app.use(express.static('static'));

app.use(cookieParser());
app.get('/', function(req, res){
    res.send("Hello world!");  
 });

 app.get('/cookietest', function(req, res){
    res.cookie('test', 'cookie').send('cookie set');
 })
 
 app.listen(3000);