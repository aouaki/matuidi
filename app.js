/*
Setup Express server
*/

var PORT = Number(process.env.PORT || 8080)
var express = require('express'),
app = module.exports = express(),
server = require('http').createServer(app),
routes = require('./routes'),
api = require('./routes/api'),
io = require('socket.io').listen(server),
vote = require('./routes/vote');

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
app.get('/vote', vote.vote);
app.get('/api/tweets/:hashtag/:tweetNb', api.tweets);
app.get('/api/tweets/:hashtag/:tweetNb/:tweetId', api.someTweets);

app.engine('html', require('ejs').renderFile);

var votes = [ 
{ choice: 1, label: 'Paris Saint Germain', votes: 0 },
{ choice: 2, label: 'Olympique de Marseille', votes: 0 },
{ choice: 3, label: 'SO Chambéry', votes: 0 },
{ choice: 4, label: 'Monaco FC', votes: 0 }
];

io.sockets.on('connection', function (socket) {
    socket.emit('votes', { votes: votes });
    socket.on('vote', function(msg){
        console.log(msg);
        votes[msg.vote-1].votes++;
        io.sockets.emit('votes', { votes: votes });
    })
});
