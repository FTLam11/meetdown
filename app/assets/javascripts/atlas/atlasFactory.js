var atlas = angular.module('meetdown');

atlas.factory('AtlasFactory', function() {
  var obj = {};
  
  obj.COLORS = [
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

  obj.plotHeatmap = function(data) {
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
  };

  obj.setLayer = function(zipString) {
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
  };

  obj.setZipColorQuery = function(zipObj) {
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
  };

  obj.colorMe = function(zipcode, color) {
      var obj = {
        where: 'Zipcode = ' + zipcode,
        polygonOptions: {
          fillColor: color
        }
      };
      return obj;
  };

  return obj;
});