var main = angular.module('meetdown');

main.controller('ProfileCtrl', ['$scope', '$stateParams', '$window', 'User', function($scope, $stateParams, $window, User) {
setProfile()
// $scope.user = window.localStorage.user
    console.log($stateParams)

function setProfile(){
  if ($stateParams.id) {
    User.get({user_id: $stateParams.id}).$promise.then(function(data) {
      $scope.user = data;
    })
  } else {
    $scope.user = $window.localStorage.user;
  }
}
}]);