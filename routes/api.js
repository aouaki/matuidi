/*
   Twitter API integration
*/

var test = Number(process.env.PORT | 0);
if (test==0) {
    var config = require('../config');
}
else {
    var config = {
        consumer_key: process.env.CONSUMER,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS,
        access_token_secret: process.env.ACCESS_SECRET
    };
}

var Twit = require('twit'),
    T = new Twit(config);

exports.tweets = function(req, res) {
    var hashtag = req.params.hashtag;
    var tweetNb = req.params.tweetNb;
    T.get('search/tweets', {q: '%23' + hashtag + ' since:2013-08-01', geocode:['46.6', '1.88', '550km'], count: tweetNb}, function(err, data) {
        if (typeof data === "undefined") {
            res.json({status: false});
        } else {
            res.json({tweets: data, status: true});
        }
    });
};

exports.someTweets = function(req, res) {
    var hashtag = req.params.hashtag;
    var tweetNb = req.params.tweetNb;
    T.get('search/tweets', {q: '%23' + hashtag + ' since:2013-08-01', geocode:['46.6', '1.88', '550km'], count: tweetNb, max_id=id}, function(err, data) {
        if (typeof data === "undefined") {
            res.json({status: false});
        } else {
            res.json({tweets: data, status: true});
        }
    });
};
