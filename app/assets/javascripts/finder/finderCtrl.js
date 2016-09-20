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
    if (topics === []){return []}
    var filtered = topics.filter(function(topic) {
      if(topic.verbArr.indexOf(currentVerb) != -1) {
        return topic
      }
    });
    return filtered;
  };
});

finder.controller('FinderCtrl', ['$scope', 'interests', 'Topics', '$location','CreateInterest', 'GetUserTopics', 'CreateAction', 'Suggest', '$auth', function($scope, interests, Topics, $location, CreateInterest, GetUserTopics, CreateAction, Suggest, $auth) {
$scope.verbs = interests.verbs;
$scope.sentences=interests.sentences;
$scope.userTopics = [];
$scope.topics = [];
$scope.currentVerb=$scope.verbs[0];
console.log($auth.getPayload()['id'])

GetUserTopics.get({user_id: $auth.getPayload()['id']}).$promise.then(function(data) {
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

$scope.submitKeyword = function() {
  for (var i = 0; i < $scope.topics.length; i++) {
    if ($scope.topics[i].name.toLowerCase() === $scope.keyword.toLowerCase()) {
      $scope.createInterest($scope.topics[i]);
      $scope.keyword = '';
    }
  };

  if ($scope.keyword != '') {
    $scope.keyword = 'Interest not found!';
  }
};
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

$scope.suggest = function(suggestion) {
  Suggest.save({"body": suggestion})
  $scope.suggestion = ""
  alert("thnx")
}

$scope.createInterest = function(topic) {
  console.log(angular.fromJson(window.localStorage['user']))
  CreateInterest.save({topic_id: topic.id, user_id: $auth.getPayload['user']['id']})
  $scope.userTopics.push(topic)
};
//Decide how to display added topics by verb
//How to style the topics and question side
}]);