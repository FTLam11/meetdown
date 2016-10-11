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

finder.controller('FinderCtrl', ['$scope', '$state', 'interests', 'Topics', '$location','CreateInterest', 'GetUserTopics', 'CreateAction', 'Suggest', '$auth', 'Authenticate', function($scope, $state, interests, Topics, $location, CreateInterest, GetUserTopics, CreateAction, Suggest, $auth, Authenticate) {

Authenticate();

$scope.verbs = interests.verbs;
$scope.sentences = interests.sentences;
$scope.userTopics = [];
$scope.topics = [];
$scope.currentVerb = $scope.verbs[0];

GetUserTopics.get({user_id: $auth.getPayload()['id']}).$promise.then(function(data) {
  if (data.user_topics) {
    $scope.userTopics = data.user_topics;
  };
});

Topics.get().$promise.then(function(data) {
  for (var i = 0; i < data.topics.length; i++) {
    interests.addVerbArr(data.topics[i])
  };
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
  };
};

$scope.resetDuplicate = function() {
  $scope.duplicate = false;
};

$scope.nextQuestion = function(direction) {
  var index = $scope.verbs.indexOf($scope.currentVerb);

  if (direction === 'up') {
    if (index === 0) {
      index = $scope.verbs.length - 1;
    } else {
      index -= 1;
    };
  } else {
    if (index === $scope.verbs.length - 1) {
      index = 0;
    } else {
      index += 1;
    };
  };

  $scope.currentVerb = $scope.verbs[index];
};

$scope.setVerb = function(verb) {
  $scope.currentVerb = verb;
};

$scope.showTopic = function(topic) {
  $location.path("/topics/"+topic.id);
};

$scope.suggest = function(suggestion) {
  Suggest.save({"body": suggestion});
  $scope.suggestion = "";
};

$scope.createInterest = function(topic) {
  CreateInterest.save({topic_id: topic.id, user_id: $auth.getPayload()['id']})
  $scope.userTopics.push(topic)
};

$scope.color = function(verb) {
  switch (verb) {
    case "discuss":
      return "#a7ffeb";
      break;
    case "play":
      return "#64ffda";
      break;
    case "listen":
      return "#1de9b6";
      break;
    case "watch":
      return "#00bfa5";
      break;
    case "learn":
      return "#00e676";
      break;
    case "go to":
      return "#00c853";
      break;
    case "I identify as":
      return "#00b8d4";
      break;
  } 
};
}]);