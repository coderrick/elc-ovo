const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
require('./routes')(app);

console.log("Go to localhost:3000");

//Allow static files to be served
app.use(express.static('static'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(cookieParser());

app.listen(3000);