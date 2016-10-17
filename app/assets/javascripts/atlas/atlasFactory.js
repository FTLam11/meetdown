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

  obj.COLORS_FUSION = [
    "#49006A",
    "#DD3497",
    "#F768A1",
    "#FA9FB5",
    "#FDE0DD",
  ]

  obj.setLayer = function(zipString) {
    return {
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
    var chunk = Math.floor(zipKeys.length / 5);
    var arrNum = 0;

    if (chunk > 0) {
      for (var colorNum = 0; colorNum < 5; colorNum++) {
        var combinedZipString = "";
        for (var chunkNum = 0; chunkNum < chunk; chunkNum++) {
          combinedZipString += zipKeys[arrNum] + ",";
          arrNum++;
        };
        combinedZipString = combinedZipString.slice(0, -1);
          queryArr.push(this.colorMe(combinedZipString, this.COLORS_FUSION[colorNum]));
      };
    }

    return queryArr;
  };

  obj.colorMe = function(zipcode, color) {
      var obj = {
        where: 'Zipcode IN (' + zipcode + ')',
        polygonOptions: {
          fillColor: color
        }
      };
      return obj;
  };

  return obj;
});