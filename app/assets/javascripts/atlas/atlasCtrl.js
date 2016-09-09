var atlas = angular.module('meetdown')

atlas.controller('AtlasCtrl', ['$scope', 'uiGmapGoogleMapApi', 'interests','Topics','GetUserTopics', 'ZipCount', function($scope, uiGmapGoogleMapApi,interests,Topics,GetUserTopics,ZipCount) {
  $scope.topics = [];
  $scope.userTopics = [];
  $scope.queryTopic = ""

  $scope.setQueryTopic = function(topic){
    $scope.queryTopic=topic
    $scope.map.fusionlayer = {}
    ZipCount.get({id: topic.id}).$promise.then(function(data){
      plotHeatmap(data)
    })
  }

  function plotHeatmap(data){
    $scope.map.fusionlayer.query = {}

    if (Object.keys(data.zip_codes).length > 0 ) {
      var zipString = "("
      for (var key in data.zip_codes){
        zipString += key +","
      }

      zipString = zipString.slice(0,-1) + ")"
      setLayer(zipString)
      setColor(data.zip_codes)

      
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
  	center: { latitude: 42, longitude: -88 }, 
    options: { minZoom: 3, maxZoom: 15 }, 
  	zoom: 9,
    styles: [{
              "featureType": "administrative",
              "elementType": "labels.text.fill",
              "stylers": [
                  {
                      "color": "#444444"
                  }
              ]
          },
          {
              "featureType": "landscape",
              "elementType": "all",
              "stylers": [
                  {
                      "color": "#f2f2f2"
                  }
              ]
          },
          {
              "featureType": "poi",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "road",
              "elementType": "all",
              "stylers": [
                  {
                      "saturation": -100
                  },
                  {
                      "lightness": 45
                  }
              ]
          },
          {
              "featureType": "road.highway",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "simplified"
                  }
              ]
          },
          {
              "featureType": "road.arterial",
              "elementType": "labels.icon",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
          },
          {
              "featureType": "transit",
              "elementType": "all",
              "stylers": [
                  {
                      "visibility": "off"
                  }
              ]
      },
      {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
              {
                  "color": "#89d1d3"
              },
              {
                  "visibility": "on"
              }
          ]
    }]
  }

  function setColor(zipArray){

    return [{
      where: 'Zipcode != '+'60089',
      polygonOptions: {}
    }, {
      where: 'Zipcode = '+'60089',
      polygonOptions: {
        fillColor: '#0000FF'
      }
    }, {
      where: 'population > 5',
      polygonOptions: {
        fillOpacity: 1.0
      }
    }]
  }

  function setLayer(zipString) {
    $scope.map.fusionlayer = {
          options: {
            heatmap: {
              enabled: false
            },
            query: {
              select: "geometry",
              from: "1n9XBy8dml7ZGNt65-m8XBYnvXIPaImQnDDlMKum6",
              where: "Zipcode IN " + zipString
            },
            options: {
              styleId: 2,
              templateId: 3
            },
          }
        }
      }
}])