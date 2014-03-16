angular.module('footbarGame', [])
  .controller('GameDetailCtrl', function ($scope, $http) {
    $scope.tweetReq = 0;
    $scope.error = 0;
    $scope.detected = false;
    $scope.game = 'PSG - OM';

    $scope.getTrends = function() {
        tweetReq = $scope.tweetReq;
        $http.get('/api/tweets/' + tweetReq)
      .success(function(data, status, headers, config) {
          if (data.status) {
              $scope.trends = data.trends[0].trends;
          } else {
              $scope.errorMsg = "Pas de tweets pour le match " + $scope.game + ". Réessayez plus tard.";
              $scope.error = 1;
          }
      });
    }

  });
