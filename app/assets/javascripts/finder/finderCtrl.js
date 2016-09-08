var finder = angular.module('meetdown')

finder.filter('filterCategories', function () {
  return function(topics, userInterests) {
    var userInterestNames = userInterests.map(function(topic){
      return topic.name
    });
    var filtered = topics.filter(function(topic) {
      if(userInterestNames.indexOf(topic.name) === -1) {
        return topic
      }
    });
    return filtered;
  };
});

finder.filter('filterVerbs', function () {
  return function(topics, currentVerb) {
    console.log(topics)
    if (topics === []){return []}
    var filtered = topics.filter(function(topic) {
      if(topic.verbArr.indexOf(currentVerb) != -1) {
        return topic
      }
    });
    return filtered;
  };
});

finder.controller('FinderCtrl', ['$scope', 'interests', 'Topics', '$location','CreateInterest', 'Auth', 'GetUserTopics', 'CreateAction', function($scope, interests, Topics, $location, CreateInterest, Auth, GetUserTopics, CreateAction) {

$scope.verbs = interests.verbs;
$scope.sentences=interests.sentences;
$scope.userTopics = [];
$scope.topics = [];
$scope.currentVerb=$scope.verbs[0];

GetUserTopics.get({user_id: angular.fromJson(window.localStorage['user'])['id']}).$promise.then(function(data) {
  if (data.user_topics) {
    $scope.userTopics = data.user_topics;
  }
})

Topics.get().$promise.then(function(data) {
  for (var i = 0; i < data.topics.length; i++) {
    interests.addVerbArr(data.topics[i])
  }
  $scope.topics = data.topics;
});


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

$scope.nextQuestion = function(verb){
  var index = $scope.verbs.indexOf($scope.currentVerb)
  if (index === $scope.verbs.length-1)
    {index = 0}
  else
    {index += 1}
  $scope.current_verb=$scope.verbs[index]
}

$scope.setVerb = function(verb) {
  $scope.currentVerb = verb
}

$scope.showTopic = function(topic) {
  $location.path("/topics/"+topic.id);
}

$scope.createInterest = function(topic) {
  CreateInterest.save({topic_id: topic.id, user_id: angular.fromJson(window.localStorage['user'])['id']})
  $scope.userTopics.push(topic)
  CreateAction.save({topic_id: topic.id, verb_id: $scope.currentVerb})
};
//Decide how to display added topics by verb
//How to style the topics and question side
}]);