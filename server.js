//Dependencies
const express = require('express'),
    app = express(),
    port = process.env.PORT || 8080;

const bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./app/models/models');

//Routes
const api = require('./app/routes/routes');

const global = require('./global');

//Connection mongo DB
mongoose.connect('mongodb://' + global.prodMongDb + '/'+ global.mongoDb , { useNewUrlParser: true });

//Parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//API
app.use('/api', api);


//Server
app.listen(port, () => {
    console.log(`App listening port ${port}`);
})