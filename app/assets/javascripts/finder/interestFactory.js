var account = angular.module('meetdown');

account.factory('interests', ['Topics', function(Topics) {
  var obj = {
    user_interests: [],
    topics: [],
    verbs:["talk about","play","listen","watch","learn","attend","like me"],
    sentences: {"talk about":"Things I would meet people to talk about",
    				"play":"Things I would meet people to play together",
				"listen":"Things I would meet people to listen to together",
				"watch":"Things I would meet people to watch together",
				"learn":"Things I would meet people to learn together",
				"like me":"Things that I share with other people that I would like to meet",
				"attend": "Things I would meet people to attend together"}
  };

  obj.topics = Topics.get();
  obj.topics.$promise.then(function(data) {
    obj.topics = data.topics;
  });

  return obj;
}]);
