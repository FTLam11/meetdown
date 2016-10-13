var account = angular.module('meetdown');

account.factory('interests', ['Topics', function(Topics) {
  var obj = {
    user_interests: [],
    topics: [],
    verbArr:[],
    verbs:["Identity","Profession","Physical Activity","Games","Learning","Discussions","Performances or Viewings","Food or Drink","Social Events and Outings","Join"],
    sentences: {
      "Identity": "I want to meet other",
      "Profession":"Fields and interests I want to network within",
      "Physical Activity": "Physical activities I'd like to partake in",
      "Games": "Games I want to play",
	"Learning": "Classes or workshops (non-professional) I'd attend",
      "Discussions": "Things I'd discuss with others",
      "Performances or Viewings": "Things I'd go see or listen to",
      "Food or Drink": "Foors or drinks I enjoy",
      "Social Events and Outings": "Things I'd go to to meet new people",
	"Join": "Partnerships, teams, and groups, I'd like to be a part of"},
    addVerbArr: function(topic){
      topic.verbArr = []
      if (topic.verbs[0] === "1"){topic.verbArr.push("Identity")}
      if (topic.verbs[1] === "1"){topic.verbArr.push("Profession")}
      if (topic.verbs[2] === "1"){topic.verbArr.push("Physical Activity")}
      if (topic.verbs[3] === "1"){topic.verbArr.push("Games")}
      if (topic.verbs[4] === "1"){topic.verbArr.push("Learning")}
      if (topic.verbs[5] === "1"){topic.verbArr.push("Discussions")}
      if (topic.verbs[6] === "1"){topic.verbArr.push("Performances or Viewings")}
      if (topic.verbs[7] === "1"){topic.verbArr.push("Food or Drink")}
      if (topic.verbs[8] === "1"){topic.verbArr.push("Social Events and Outings")}
      if (topic.verbs[9] === "1"){topic.verbArr.push("Join")}
    }
  }
  return obj;
}]);
