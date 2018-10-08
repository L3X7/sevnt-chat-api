//Dependencies
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;

const bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./app/models/models');

//Routes
const api = require('./app/routes/routes');

//Connection mongo DB
mongoose.connect('mongodb://sevnt_user:alx7.Sevnt@ds125673.mlab.com:25673/sevnt_chat_db', { useNewUrlParser: true });

//Parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//API
app.use('/api', api);


//Server
app.listen(port, () => {
    console.log(`App listening port ${port}`);
})