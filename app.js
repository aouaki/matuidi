/*
Setup Express server
*/

var PORT = Number(process.env.PORT || 8080)
var express = require('express'),
app = module.exports = express(),
server = require('http').createServer(app),
routes = require('./routes'),
api = require('./routes/api');

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    }
    else {
        next();
    }
};

app.use(allowCrossDomain);
app.locals.pretty = true;
app.use(express.static(__dirname + '/public'));
app.use('/components', express.static(__dirname + '/components'));
app.use('/js', express.static(__dirname + '/js'));

server.listen(PORT, function(){
  console.log("Express server up and running.");
});

app.get('/', routes.index);
app.get('/api/tweets/:hashtag/:tweetNb', api.tweets);
app.get('/api/tweets/:hashtag/:tweetNb/:tweetId', api.someTweets);

app.engine('html', require('ejs').renderFile);
