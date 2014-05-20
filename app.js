/*
Setup Express server
*/

var PORT = Number(process.env.PORT || 8080)
var express = require('express'),
app = module.exports = express(),
server = require('http').createServer(app),
routes = require('./routes'),
api = require('./routes/api'),
io = require('socket.io').listen(server);

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
app.set('views', __dirname + '/public/');


server.listen(PORT, function(){
  console.log("Express server up and running.");
});

app.get('/', routes.index);
app.get('/vote', routes.vote);
app.get('/api/tweets/all/:hashtag/:tweetNb', api.tweets);
app.get('/api/tweets/older/:hashtag/:tweetNb/:tweetId', api.someTweets);
app.get('/api/tweets/newer/:hashtag/:tweetNb/:tweetId', api.reloadTweets);
app.get('/api/goaltweets', api.goalTweets);

app.engine('html', require('ejs').renderFile);

var votes = [ 
{ choice: 1, label: 'PSG', votes: 1 },
{ choice: 2, label: 'ACA', votes: 1 },
{ choice: 3, label: 'MHSC', votes: 1 },
{ choice: 4, label: 'FCGB', votes: 1 },
{ choice: 5, label: 'EAG', votes: 1 },
{ choice: 6, label: 'FCSM', votes: 1 },
{ choice: 7, label: 'ETG', votes: 1 },
{ choice: 8, label: 'TFC', votes: 1 },
{ choice: 9, label: 'VAFC', votes: 1 },
{ choice: 10, label: 'ASM', votes: 1 },
{ choice: 11, label: 'OL', votes: 1 },
{ choice: 12, label: 'FCN', votes: 1 },
{ choice: 13, label: 'LOSC', votes: 1 },
{ choice: 14, label: 'SRFC', votes: 1 },
{ choice: 15, label: 'OM', votes: 1 },
{ choice: 16, label: 'OGCN', votes: 1 },
{ choice: 17, label: 'ASSE', votes: 1 },
{ choice: 18, label: 'FCL', votes: 1 },
{ choice: 19, label: 'SCB', votes: 1 },
{ choice: 20, label: 'SR', votes: 1 }
];
io.sockets.on('connection', function (socket) {
    socket.emit('votes', { votes: votes });
    socket.on('vote', function(msg){
        console.log(msg);
        votes[msg.vote-1].votes++;
        io.sockets.emit('votes', { votes: votes });
    })
});
