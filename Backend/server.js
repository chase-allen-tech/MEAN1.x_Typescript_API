var express = require('express');
var morgan = require('morgan');
var app = express();
var port = process.env.PORT || 8000;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var routes = require('./app/routes/api')(router);
var path = require('path');
const cors = require('cors');

app.use(morgan('dev'));
app.use(cors());
app.options("*", cors());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(__dirname + '/public'));//gives front-end access to public folder
app.use('/api',routes);


app.listen(port, function(){
    console.log('running server on port ' + port);
});