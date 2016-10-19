var atlas = angular.module('meetdown')

atlas.controller('AtlasCtrl', ['$scope', 'uiGmapGoogleMapApi', 'Topics', 'GetUserTopics', 'ZipCount', 'StyleMap', 'GetZipTopics', '$auth', 'AtlasFactory','$location','$uibModal', function($scope, uiGmapGoogleMapApi, Topics, GetUserTopics, ZipCount, StyleMap, GetZipTopics, $auth, AtlasFactory,$location,$uibModal) {
  $scope.topics = [];
  $scope.showFusionLayer = true;
  $scope.map = StyleMap;
  $scope.map.fusionlayer = {};
  $scope.events = [];
  $scope.currentZip = "60654";
  $scope.userTopics = [];
  $scope.currentTopic = ""

  var openModal = function(){
    var modalInstance = $uibModal.open({
              backdrop  : 'static',
              controller: 'surveyCtrl',
              templateUrl: 'survey/_survey.html',
              keyboard  : false
            })
    modalInstance.result.then(function () {
              //on ok button press
              var zip = $auth.getPayload().zip_code
              $scope.currentZip = zip
              $scope.setCurrentZip(zip);
          }, function () {
              //on cancel button press
          });
  }

  if ($auth.getPayload() != undefined && $auth.getPayload().zip_code != undefined) {
    $scope.currentZip = $auth.getPayload().zip_code;
  }
  else{openModal()};

  console.log($auth.getPayload())

  $scope.setCurrentZip = function(zipcode) {
    $scope.currentTopic = ""
    $scope.interestZip = zipcode;
    GetZipTopics.get({ zip_code: zipcode }).$promise.then(function(data) {
      $scope.zipTopics = data.topics_in_my_zip;
      $scope.events = data.events;
      var obj = {};
      obj[zipcode] = 1;
      $scope.map.fusionlayer = AtlasFactory.setLayer(zipcode);
      $scope.map.fusionlayer.options.styles = AtlasFactory.setZipColorQuery(obj);
    });
  };

  $scope.setCurrentZip($scope.currentZip);
  // showLegend="true"

  $scope.d3color = function() {
    return function(d, i) {
      return AtlasFactory.COLORS[i];
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
    $scope.currentTopic=topic.name
    ZipCount.get({ id: topic.id }).$promise.then(function(data) {
      plotHeatmap(data);
    });
  };

  Topics.get().$promise.then(function(data) {
    $scope.topics = data.topics;
    GetUserTopics.get({user_id: $auth.getPayload()['id']}).$promise.then(function(data) {
      if (data.user_topics) {
        $scope.userTopics = data.user_topics;

        for (var i = 0; i < $scope.userTopics.length; i++) {
          $scope.topics = $scope.topics.filter(function(topicObj){ 
            return topicObj.id != $scope.userTopics[i].id;
          });
          $scope.topics.unshift($scope.userTopics[i])
        };
      };
    });
  });

  function plotHeatmap(data) {
    if (Object.keys(data.zip_codes).length > 0) {
      var zipString = "(";
      for (var key in data.zip_codes) {
        zipString += key + ",";
      };
      zipString = zipString.slice(0, -1) + ")";
      $scope.map.fusionlayer = AtlasFactory.setLayer(zipString);
      $scope.map.fusionlayer.options.styles = AtlasFactory.setZipColorQuery(data.zip_codes);
      $scope.showFusionLayer = true;
    } else {
      $scope.showFusionLayer = false;
    };
  };
}])
