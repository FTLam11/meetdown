var nav = angular.module('meetdown')

nav.controller('NavCtrl', ['$scope', '$auth', function($scope, $auth) {
  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.logout = function() {
    return $auth.logout();
  };
}]);