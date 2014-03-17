/*
Setup Express server
*/

var PORT = Number(process.env.PORT || 8080)
var express = require('express'),
app = module.exports = express(),
server = require('http').createServer(app),
routes = require('./routes'),
api = require('./routes/api');

app.configure(function() {
    app.locals.pretty = true;
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + '/public'));
    app.use('/components', express.static(__dirname + '/components'));
    app.use('/js', express.static(__dirname + '/js'));
    app.use(app.router);
    app.engine('html', require('ejs').renderFile);
});

server.listen(PORT, function(){
  console.log("Express server up and running.");
});

app.get('/', routes.index);
//app.get('/api/tweets/:tweetReq', api.tweets);
