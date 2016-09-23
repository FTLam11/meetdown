var main = angular.module('meetdown');

main.controller('ProfileCtrl', ['$scope', '$stateParams', '$window', 'User', 'GetUserTopics', '$location', '$auth',  function($scope, $stateParams, $window, User, GetUserTopics, $location, $auth) {
setProfile()

function setProfile(){
  if ($stateParams.id) {
    User.get({user_id: $stateParams.id}).$promise.then(function(data) {
      $scope.user = data.user;
    });
    getUserData($stateParams.id);
  } 
  else {
    $scope.user = $auth.getPayload();
    console.log($scope.user)
    getUserData($auth.getPayload()['id']);
  }
}

$scope.showTopic = function(topic) {
  $location.path("/topics/"+topic.id);
}

function getUserData(userID) {
  GetUserTopics.get({user_id: userID}).$promise.then(function(data) {
    if (data.user_topics) {
      $scope.userTopics = data.user_topics;
    } else {
      $scope.nilTopics = ["No interests found"];
    };
  });
}
}]);