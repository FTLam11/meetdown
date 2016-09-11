var atlas = angular.module('meetdown')

atlas.controller('AtlasCtrl', ['$scope', 'uiGmapGoogleMapApi', 'interests', 'Topics', 'GetUserTopics', 'ZipCount', 'StyleMap', function($scope, uiGmapGoogleMapApi, interests, Topics, GetUserTopics, ZipCount, StyleMap) {
    $scope.topics = [];
    $scope.userTopics = [];
    $scope.queryTopic = "";
    $scope.showFusionLayer = true;
    $scope.map = StyleMap;
    $scope.map.fusionlayer = {};

    $scope.setQueryTopic = function(topic) {
        $scope.queryTopic = topic;

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
    };

    GetUserTopics.get({ user_id: angular.fromJson(window.localStorage['user'])['id'] }).$promise.then(function(data) {
        if (data.user_topics) {
            $scope.userTopics = data.user_topics;
        }
    });

    Topics.get().$promise.then(function(data) {
        for (var i = 0; i < data.topics.length; i++) {
            interests.addVerbArr(data.topics[i]);
        }
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
    };

    function setZipColorQuery(zipObj) {
        var zipKeys = Object.keys(zipObj);
        var queryArr = [];
        var colors = [
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
        var chunk = Math.floor(zipKeys.length / 8);
        var zipsThatGetLastColor = zipKeys.length % 8;
        var currentColor = 0;
        var arrNum = 0;
        var colorNum = 0;

        while (colorNum < 7) {
            for (var chunkNum = 0; chunkNum < chunk; chunkNum++) {
                queryArr.push(colorMe(zipKeys[arrNum], colors[colorNum]));
                arrNum++;
            };
            colorNum++;
        }

        for (; arrNum < zipKeys.length; arrNum++) {
            queryArr.push(colorMe(zipKeys[arrNum], colors[colors.length - 1]));
        };

        $scope.map.fusionlayer.options["styles"] = queryArr;
    };

    function colorMe(zipcode, color) {
        var obj = {
            where: 'Zipcode = ' + zipcode,
            polygonOptions: {
                fillColor: color
            }
        };
        return obj;
    };
}])
