var atlas = angular.module('meetdown')

atlas.controller('AtlasCtrl', ['$scope', 'uiGmapGoogleMapApi', 'Topics', 'GetUserTopics', 'ZipCount', 'StyleMap', 'GetZipTopics', 'Topic', '$auth', function($scope, uiGmapGoogleMapApi, Topics, GetUserTopics, ZipCount, StyleMap, GetZipTopics, Topic, $auth) {
  $scope.topics = [];
  $scope.showFusionLayer = true;
  $scope.map = StyleMap;
  $scope.map.fusionlayer = {};
  $scope.events = [];
  $scope.currentZip = "60654";

  if ($auth.getPayload() != undefined && $auth.getPayload().zip_code != undefined) {
    $scope.currentZip = $auth.getPayload()['zip_code'];
  };

  function setCurrentZip(zipcode) {
    GetZipTopics.get({ zip_code: zipcode }).$promise.then(function(data) {
      $scope.d3data = data.topics_in_my_zip;
      $scope.zipTopics = data.topics_in_my_zip;
      $scope.events = data.events;
    });
  };

  setCurrentZip($scope.currentZip)

  // pieLabelsOutside="false"
  // labelType="key"
  // labelType="value"
  // showLegend="true"
  // showLabels="true"

  $scope.d3color = function() {
    return function(d, i) {
      return COLORS[i];
    };
  };

  $scope.d3topic = function() {
    return function(d) {
      return d.name;
    };
  };

  $scope.d3count = function() {
    return function(d) {
      return d.count;
    };
  };

  $scope.setQueryTopic = function(topic) {
    ZipCount.get({ id: topic.id }).$promise.then(function(data) {
      plotHeatmap(data);
    });
  };

  function plotHeatmap(data) {
    if (Object.keys(data.zip_codes).length > 0) {
      var zipString = "(";
      for (var key in data.zip_codes) {
        zipString += key + ",";
      }

      zipString = zipString.slice(0, -1) + ")";
      setLayer(zipString);
      setZipColorQuery(data.zip_codes);
      $scope.showFusionLayer = true;
    } else {
      $scope.showFusionLayer = false;
    }
  }; //service?

  Topics.get().$promise.then(function(data) {
    $scope.topics = data.topics;
  });

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
        }
      }
    };
  }; //service?

  const COLORS = [
    "#49006A",
    "#7A0177",
    "#AE017E",
    "#DD3497",
    "#F768A1",
    "#FA9FB5",
    "#FCC5C0",
    "#FDE0DD",
    "#FFF7F3"
  ]; //factory

  function setZipColorQuery(zipObj) {
    var zipKeys = Object.keys(zipObj);
    var queryArr = [];
    var chunk = Math.floor(zipKeys.length / 8);
    var zipsThatGetLastColor = zipKeys.length % 8;
    var currentColor = 0;
    var arrNum = 0;

    if (chunk > 0) {
      for (var colorNum = 0; colorNum < 7; colorNum++) {
        for (var chunkNum = 0; chunkNum < chunk; chunkNum++) {
          queryArr.push(colorMe(zipKeys[arrNum], COLORS[colorNum]));
          arrNum++;
        };
      };
    }

    for (; arrNum < zipKeys.length; arrNum++) {
      queryArr.push(colorMe(zipKeys[arrNum], COLORS[COLORS.length - 1]));
    };

    $scope.map.fusionlayer.options["styles"] = queryArr;
  }; //service?

  function colorMe(zipcode, color) {
    var obj = {
      where: 'Zipcode = ' + zipcode,
      polygonOptions: {
        fillColor: color
      }
    };
    return obj;
  }; //factory
}])
