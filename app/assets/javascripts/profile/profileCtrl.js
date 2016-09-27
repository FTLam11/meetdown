var main = angular.module('meetdown');

main.controller('ProfileCtrl', ['$scope', '$stateParams', '$window', 'User', 'GetUserTopics', '$location', '$auth', 'UserEventList', function($scope, $stateParams, $window, User, GetUserTopics, $location, $auth,UserEventList) {
setProfile()

function showEvents(){
  UserEventList.get({id: $scope.user.id}).$promise.then(function(data) {
    $scope.hostings = data.hostings
    $scope.attendings = data.attendings
  })
}



function setProfile(){
  if ($stateParams.id) {
    User.get({user_id: $stateParams.id}).$promise.then(function(data) {
      $scope.user = data.user;
      showEvents();
    });
    getUserData($stateParams.id);
  } 
  else {
    $scope.user = $auth.getPayload();
    console.log($scope.user)
    getUserData($auth.getPayload()['id']);
    showEvents();
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