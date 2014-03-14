/*
Twitter API integration
*/
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
