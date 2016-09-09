var atlas = angular.module('meetdown')

atlas.controller('AtlasCtrl', ['$scope', 'uiGmapGoogleMapApi', 'interests','Topics','GetUserTopics', 'ZipCount', function($scope, uiGmapGoogleMapApi,interests,Topics,GetUserTopics,ZipCount) {
  $scope.topics = [];
  $scope.userTopics = [];
  $scope.queryTopic = ""
  $scope.zipArrToSQL = " = 0"

  $scope.setQueryTopic = function(topic){
    $scope.queryTopic=topic
    ZipCount.get({id: topic.id}).$promise.then(function(data){
      plotHeatmap(data)
    })
  }

  function plotHeatmap(data){
    if (Object.keys(data.zip_codes).length > 0 ) {
      var zipString = "("
      for (var key in data.zip_codes){
        zipString += key +","
      }

      zipString = zipString.slice(0,-1) + ")"
      $scope.zipArrToSQL = "IN " + zipString
      console.log($scope.zipArrToSQL)
      $scope.map.fusionlayer.options.query = {
            query: {
              select: "geometry",
              from: "1n9XBy8dml7ZGNt65-m8XBYnvXIPaImQnDDlMKum6",
              where: 'Zipcode = 60089'
            }
          };
    }
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
            from: "1n9XBy8dml7ZGNt65-m8XBYnvXIPaImQnDDlMKum6",
            where: 'Zipcode' + $scope.zipArrToSQL
          },
          options: {
            styleId: 2,
            templateId: 3
          },
          // styles: [{
          //   where: 'Zipcode != '+'60089',
          //   polygonOptions: {}
          // }, {
          //   where: 'Zipcode = '+'60089',
          //   polygonOptions: {
          //     fillColor: '#0000FF'
          //   }
          // }, {
          //   where: 'population > 5',
          //   polygonOptions: {
          //     fillOpacity: 1.0
          //   }
          // }]
        }
      }
}])