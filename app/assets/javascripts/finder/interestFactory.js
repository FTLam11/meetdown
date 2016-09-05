var account = angular.module('meetdown');

account.factory('interests', ['Topics', function(Topics) {
  var obj = {
    user_interests: [],
    topics: [],
    verbArr:[],
    verbs:["discuss","play","listen","watch","learn","go to","I identify as"],
    sentences: {"discuss": "Things I would meet people to discuss",
    				"play":" Things I would meet people to play together",
				"listen": "Things I would meet people to listen to together",
				"watch": "Things I would meet people to watch together",
				"learn": "Things I would meet people to learn together",
				"I identify as": "Things that I identify as and would meet people over",
				"go to": "Things I would go to with other people"},
    addVerbArr: function(topic){
      topic.verbArr = []
      if (topic.verbs[0] === "1"){topic.verbArr.push("discuss")}
      if (topic.verbs[1] === "1"){topic.verbArr.push("play")}
      if (topic.verbs[2] === "1"){topic.verbArr.push("listen")}
      if (topic.verbs[3] === "1"){topic.verbArr.push("watch")}
      if (topic.verbs[4] === "1"){topic.verbArr.push("learn")}
      if (topic.verbs[5] === "1"){topic.verbArr.push("I identify as")}
      if (topic.verbs[6] === "1"){topic.verbArr.push("go to")}
    }
  }
  return obj;
}]);
