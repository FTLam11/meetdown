var main = angular.module('meetdown');

main.controller('FinderCtrl', ['$scope', 'interests', 'Topics', '$location','CreateInterest', 'Auth', 'GetUserTopics', function($scope, interests, Topics, $location, CreateInterest, Auth, GetUserTopics) {

$scope.user_interests = interests.user_interests
$scope.verbs = interests.verbs
$scope.sentences=interests.sentences

$scope.duplicate = false
$scope.current_verb=$scope.verbs[0]

Topics.get().$promise.then(function(data) {
  $scope.topics = data.topics
});

GetUserTopics.get({user_id: angular.fromJson(window.localStorage['user'])['id']}).$promise.then(function(data) {
  $scope.userTopics = data.user_topics
})

$scope.pushInterest = function(){
  if ($scope.user_interests.indexOf($scope.keyword) === -1) {
    $scope.user_interests.push($scope.keyword)
    console.log ($scope.interests)
    $scope.keyword = ''
    console.log(interests.user_interests)
  }
  else {
    $scope.duplicate=true
  }
}

$scope.resetDuplicate = function(){
  $scope.duplicate=false
}

$scope.setVerb = function(verb){
  $scope.current_verb=verb
}

$scope.nextQuestion = function(verb){
  var index = $scope.verbs.indexOf($scope.current_verb)
  if (index === $scope.verbs.length-1)
    {index = 0}
  else
    {index += 1}
  $scope.current_verb=$scope.verbs[index]
}

$scope.showTopic = function(topicid) {
  $location.path("/topics/"+topicid);
}

$scope.createInterest = function(topicid) {
  console.log(window.localStorage['user'])
  CreateInterest.save({topic_id: topicid, user_id: angular.fromJson(window.localStorage['user'])['id']}).success(function(res) {
    $scope.topic
  });
  // Show confirmation of added interest AND remove interest from $scope?
}

}]);