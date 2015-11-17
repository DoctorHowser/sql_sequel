/**
 * Created by danesmith on 11/12/15.
 */
var express = require('express');
var app = express();

var path = require('path');
var bodyParser = require('body-parser');

var index = require('./routes/index');

app.set('port', process.env.PORT || 5000);


app.use('/', index);


app.listen(app.get('port'), function(){
    console.log('listening on port: ', app.get('port'))
});