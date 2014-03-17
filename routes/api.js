/*
Twitter API integration
*/
var test = Number(process.env.PORT | 0);
if (test==0){
    var config = require('../config');
}
else {
    module.exports = {
        consumer_key: process.env.CONSUMER,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS,
        access_token_secret: process.env.ACCESS_SECRET
    };
}

var Twit = require('twit'),
config = require('../config'),
T = new Twit(config);

exports.tweets = function(req, res) {
  var tweetReq = req.params.tweetReq;
  T.get('search/tweets', {q: '%23' + tweetReq + ' since:2014-02-14', count: 100}, function(err, data) {
    if (typeof data === "undefined") {
      res.json({status: false});
    } else {
      res.json({tweets: data, status: true});
    }
  });
};
