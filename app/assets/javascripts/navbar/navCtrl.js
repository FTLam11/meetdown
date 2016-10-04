var nav = angular.module('meetdown')

nav.controller('NavCtrl', ['$scope', '$auth', '$state', function($scope, $auth, $state) {
  $scope.goAtlas = function() {
    $state.go('root.interestAtlas');
  };

  $scope.isAuthenticated = function() {
    return $auth.isAuthenticated();
  };

  $scope.logout = function() {
    return $auth.logout();
  };
}]);