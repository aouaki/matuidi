angular.module('footbarGame', [])
.controller('GameDetailCtrl', function ($scope, $http) {
    $scope.game = 'PSGASSE';

    $scope.getTrends = function() {
        game = $scope.game;
        $scope.trends
        $scope.loading = true;
        $http.get('/api/tweets/' + game).success(function(data){
            $scope.loading = false;
            $scope.trends = data.tweets.statuses;
        })
        .error(function(data){
            $scope.loading=false;
            $scope.error = 1
        });
    }
});




