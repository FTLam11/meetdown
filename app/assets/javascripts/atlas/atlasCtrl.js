var atlas = angular.module('meetdown')

atlas.controller('AtlasCtrl', ['$scope', 'uiGmapGoogleMapApi', 'Topics', 'GetUserTopics', 'ZipCount', 'StyleMap', 'GetZipTopics', 'Topic', '$auth', 'AtlasFactory', function($scope, uiGmapGoogleMapApi, Topics, GetUserTopics, ZipCount, StyleMap, GetZipTopics, Topic, $auth, AtlasFactory) {
  $scope.topics = [];
  $scope.showFusionLayer = true;
  $scope.map = StyleMap;
  $scope.map.fusionlayer = {};
  $scope.events = [];
  $scope.currentZip = "60654";
  $scope.userTopics = [];

  if ($auth.getPayload() != undefined && $auth.getPayload().zip_code != undefined) {
    $scope.currentZip = $auth.getPayload().zip_code;
  };

  GetUserTopics.get({user_id: $auth.getPayload()['id']}).$promise.then(function(data) {
  if (data.user_topics) {
    $scope.userTopics = data.user_topics;
    };
  });

  $scope.setCurrentZip = function(zipcode) {
    GetZipTopics.get({ zip_code: zipcode }).$promise.then(function(data) {
      $scope.zipTopics = data.topics_in_my_zip;
      $scope.events = data.events;
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
    ZipCount.get({ id: topic.id }).$promise.then(function(data) {
      AtlasFactory.plotHeatmap(data);
    });
  };

  Topics.get().$promise.then(function(data) {
    $scope.topics = data.topics;
    GetUserTopics.get({user_id: $auth.getPayload()['id']}).$promise.then(function(data) {
      if (data.user_topics) {
        $scope.userTopics = data.user_topics

        for (i=0;i<$scope.userTopics.length;i++) {
          $scope.topics = $scope.topics.filter(function(obj){ 
            console.log(obj.id===$scope.userTopics[i].id)
            if (obj.id != $scope.userTopics[i].id){
              return true}})
          $scope.topics.unshift($scope.userTopics[i])
        }

    };
  });
  });
}])
