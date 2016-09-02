var main = angular.module('meetdown');

main.controller('ProfileCtrl', ['$scope', '$stateParams', '$window', 'User', 'GetUserTopics', function($scope, $stateParams, $window, User, GetUserTopics) {
setProfile()
// $scope.user = window.localStorage.user

function setProfile(){
  if ($stateParams.id) {
    User.get({user_id: $stateParams.id}).$promise.then(function(data) {
      $scope.user = data;
    })
  } else {
    $scope.user = angular.fromJson($window.localStorage.user);
  }
}

GetUserTopics.get({user_id: angular.fromJson(window.localStorage['user'])['id']}).$promise.then(function(data) {
  if (data.user_topics) {
    $scope.userTopics = data.user_topics;
  } else {
    $scope.nilTopics = ["You haven't added any interests yet."];
  };
});
}]);