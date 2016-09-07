var atlas = angular.module('meetdown')

atlas.controller('AtlasCtrl', ['$scope', 'uiGmapGoogleMapApi', function($scope, uiGmapGoogleMapApi) {
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