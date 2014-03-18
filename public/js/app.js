angular.module('footbarGame', [])
.controller('GameDetailCtrl', function ($scope, $http) {
    var months = [ "January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December" ];
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
                date = new Date(trends[trend].created_at);
                trends[trend].smallDate= date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + " à " + date.getHours() + ":" + date.getMinutes();
            }
            $scope.trends = trends;
        })
        .error(function(data){
            $scope.loading=false;
            $scope.error = 1
        });
    }

    $scope.noAmp = function (trend) {
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
