var atlas = angular.module('meetdown')

atlas.controller('AtlasCtrl', ['$scope', 'uiGmapGoogleMapApi', 'interests','Topics','GetUserTopics', function($scope, uiGmapGoogleMapApi,interests,Topics,GetUserTopics) {
  $scope.topics = [];
  $scope.userTopics = [];
  $scope.queryTopic = ""

  $scope.setWueryTopic = function(topic){
    $scope.queryTopic=topic
  }

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


  $scope.map = { 
  	center: { latitude: 35, longitude: -87 }, 
    options: { minZoom: 3, maxZoom: 13 }, 
  	zoom: 9
  }
  $scope.map.fusionlayer = {
        options: {
          heatmap: {
            enabled: false
          },
          query: {
            select: "geometry",
            from: "1n9XBy8dml7ZGNt65-m8XBYnvXIPaImQnDDlMKum6"
          },
          options: {
            styleId: 2,
            templateId: 3
          }
        }
      }
      console.log($scope.map.fusionlayer)
}])