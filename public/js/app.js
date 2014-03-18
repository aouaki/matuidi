angular.module('footbarGame', [])
.controller('GameDetailCtrl', function ($scope, $http) {
    $scope.game = 'PSGASSE';

    $scope.getTrends = function() {
        game = $scope.game;
        $scope.loading = true;
        $http.get('/api/tweets/' + game).success(function(data){
            $scope.loading = false;
            trends = data.tweets.statuses;
            for (trend in trends) {
                temp = trends[trend].retweeted_status;
                if (temp != undefined) {
                    trends[trend] = temp;
                }
            }
            $scope.trends = trends;
        })
        .error(function(data){
            $scope.loading=false;
            $scope.error = 1
        });
    }

    $scope.noAmp= function (trend) {
        console.log(trend.text);
        text = trend.text;
        text = text.replace('&amp;', '&');
        trend.text = text;
        return trend;
    }
})


.filter('unique', function() {
    return function(collection, keyname) {
        var output = [], 
        keys = [];

        angular.forEach(collection, function(trend) {
            var key = trend.id;
            if(keys.indexOf(key) === -1) {
                keys.push(key);
                output.push(trend);
            }
        });

        return output;
    };
});
