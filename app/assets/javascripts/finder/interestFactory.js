var account = angular.module('meetdown');

account.factory('interests', ['Topics', function(Topics) {
  var obj = {
    user_interests: [],
    topics: [],
    verbs:["discuss","play","listen","watch","learn","go to","I identify as"],
    sentences: {"discuss": "Things I would meet people to discuss",
    				"play":" Things I would meet people to play together",
				"listen": "Things I would meet people to listen to together",
				"watch": "Things I would meet people to watch together",
				"learn": "Things I would meet people to learn together",
				"I identify as": "Things that I identify as and would meet people over",
				"go to": "Things I would go to with other people"}
  };

  obj.topics = Topics.get().$promise.then(function(data) {
    obj.topics = data.topics;
  }); //figure out how to use promises inside factory

  return obj;
}]);
