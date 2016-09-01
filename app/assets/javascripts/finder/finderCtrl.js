var main = angular.module('meetdown');

main.controller('FinderCtrl', ['$scope', 'interests', 'Topics', '$location','CreateInterest', function($scope, interests, Topics, $location, CreateInterest) {

$scope.user_interests = interests.user_interests
$scope.verbs = interests.verbs
$scope.sentences=interests.sentences

$scope.duplicate = false
$scope.current_verb=$scope.verbs[0]

Topics.get().$promise.then(function(data) {
  $scope.topics = data.topics
});

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
  var yo = $scope.verbs.indexOf($scope.current_verb)
  if (yo === $scope.verbs.length-1)
    {yo=0}
  else
    {yo +=1}
  $scope.current_verb=$scope.verbs[yo]
}

$scope.showTopic = function(topicid) {
  $location.path("/topics/"+topicid);
}

$scope.createInterest = function(topicid) {
  console.log(account.dbdetails)
  CreateInterest.save({topic_id: topicid, user_id: account.dbdetails.id})
}

}]);