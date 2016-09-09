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
    options: { minZoom: 3, maxZoom: 13 }, 
  	zoom: 9
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
      }

  function computePercentiles(zipObj) {
    var sum = 0;
    var percentile = {};

    for (var key in zipObj) {
      sum += zipObj[key];
    };
    
    for (var key in zipObj) {
      if (zipObj.hasOwnProperty(key)) {
        percentile[key]["percentile"] = zipObj[key] / sum
      }
    };

    return percentile;
  }

  function PercentileToColor(percentileArr) {

  }

  function test(zipArr) {
    zipKeys = Object.keys(zipArr);
    var arr = [];

    colors = [
      "#49006A",
      "#7A0177",
      "#AE017E",
      "#DD3497",
      "#F768A1",
      "#FA9FB5",
      "#FCC5C0",
      "#FDE0DD",
      "#FFF7F3"
    ];

    chunk = Math.floor(zipArr / 9);
    zipsThatGetLastColor = zipArr % 9;
    currentColor = 0;

    for (var i = 0; i < colors.length - 1; i++) {
      arr.push(colorMe(zipArr[j], color[currentColor]));

      for (var j = 0; j < zipArr)
    }




    for (var j = 0; j < chunk; j++) {
      arr.push(colorMe(zipArr[j], color[currentColor]));
    };

    currentColor += 1;

    for (var k = chunk + 1; k < zipsThatGetLastColor; k += chunk) {
      arr.push(colorMe(zipArr[k], color[currentColor]));
      arr.push(colorMe(zipArr[k + 1], color[currentColor]));
      currentColor += 1;
    };

    for (var l = zipsThatGetLastColor; l < zipArr.length; l++) {
      arr.push(colorMe(zipArr[l], color[-1]));
    };
  };

  function colorMe(zipcode, color) {
    {
      where: 'Zipcode = '+ zipcode,
      polygonOptions: {
        fillColor: color;
      }
    }
  }
}])