var main = angular.module('meetdown')
.filter('filterCategories', function () {
    return function (topics,userInterests ) {
      var filtered = topics;
      for (var i = 0; i < userInterests.length; i++) {
        var index = filtered.indexOf(userInterests[i])
        if (index > -1) {
          filtered.splice(index, 1);
        }
      }
      return filtered;
    }
  }
);

main.controller('FinderCtrl', ['$scope', 'interests', 'Topics', '$location','CreateInterest', 'Auth', 'GetUserTopics', function($scope, interests, Topics, $location, CreateInterest, Auth, GetUserTopics) {

$scope.verbs = interests.verbs
$scope.sentences=interests.sentences
$scope.userTopics = []
$scope.topics = []

$scope.duplicate = false
$scope.current_verb=$scope.verbs[0]

Topics.get().$promise.then(function(data) {
  $scope.topics = data.topics
});

GetUserTopics.get({user_id: angular.fromJson(window.localStorage['user'])['id']}).$promise.then(function(data) {
  if (data.user_topics) {
    $scope.userTopics = data.user_topics  
  }
})

// $scope.pushInterest = function(){
//   if ($scope.user_interests.indexOf($scope.keyword) === -1) {
//     $scope.user_interests.push($scope.keyword)
//     console.log ($scope.interests)
//     $scope.keyword = ''
//     console.log(interests.user_interests)
//   }
//   else {
//     $scope.duplicate=true
//   }
// }

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

$scope.showTopic = function(topic) {
  $location.path("/topics/"+topic.id);
}

$scope.createInterest = function(topic) {
  CreateInterest.save({topic_id: topic.id, user_id: angular.fromJson(window.localStorage['user'])['id']}).$promise.then(function(res) {
  $scope.userTopics.push(topic)
  });
  // Show confirmation of added interest AND remove interest from $scope?
}

}]);