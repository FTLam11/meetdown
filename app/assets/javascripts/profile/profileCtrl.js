var main = angular.module('meetdown');

main.controller('ProfileCtrl', ['$scope', '$stateParams', '$window', 'User', 'GetUserTopics', '$location', '$auth', 'UserEventList','SubmitSurvey', 'Authenticate', function($scope, $stateParams, $window, User, GetUserTopics, $location, $auth,UserEventList,SubmitSurvey, Authenticate) {
Authenticate();
setProfile();
$scope.homeProfile=false
$scope.editing=false

$scope.edit= function(){
  $scope.editing=true
}

$scope.cancel= function(){
  $scope.editing=false
}

$scope.saveChanges= function(){
  SubmitSurvey.update({email:$scope.tempEmail, age: $scope.tempAge, zip_code: $scope.tempZip, id: $auth.getPayload().id, token: $auth.getToken()}).$promise.then(function(response){
      $auth.setToken(response.token);
      setProfile(); //call with no argument to go to /profile
      $scope.editing=false
    })
}

function showEvents(){
  UserEventList.get({id: $scope.user.id}).$promise.then(function(data) {
    $scope.hostings = data.hostings
    $scope.attendings = data.attendings
    $scope.homeProfile = ($auth.getPayload().id === $scope.user.id)
  })
}

function setProfile(){
  if ($stateParams.id) {
    User.get({user_id: $stateParams.id}).$promise.then(function(data) {
      $scope.user = data.user;
      $scope.userTopics = data.topics
      $scope.hostings = data.hostings
      $scope.attendings = data.attendings
      $scope.homeProfile = ($auth.getPayload().id === $scope.user.id)
      showEvents();
    }); 
  } 
  else {
     User.get({user_id: $auth.getPayload().id}).$promise.then(function(data) {
      $scope.user = data.user;
      $scope.userTopics = data.topics
      $scope.hostings = data.hostings
      $scope.attendings = data.attendings
      $scope.homeProfile = ($auth.getPayload().id === $scope.user.id)
      showEvents();
    }); 
  }
}

$scope.showTopic = function(topic) {
  $location.path("/topics/"+topic.id);
}

}]);