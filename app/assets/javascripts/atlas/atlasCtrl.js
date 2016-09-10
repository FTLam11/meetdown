var atlas = angular.module('meetdown')

atlas.controller('AtlasCtrl', ['$scope', 'uiGmapGoogleMapApi', 'interests', 'Topics', 'GetUserTopics', 'ZipCount', function($scope, uiGmapGoogleMapApi, interests, Topics, GetUserTopics, ZipCount) {
    $scope.topics = [];
    $scope.userTopics = [];
    $scope.queryTopic = ""
    $scope.map = {
        center: { latitude: 42, longitude: -88 },
        options: { minZoom: 3, maxZoom: 13 },
        zoom: 9,
        styles: $scope.yao
    }
    $scope.map.fusionlayer = {}

    console.log($scope.map)

    $scope.setQueryTopic = function(topic) {
        $scope.queryTopic = topic

        ZipCount.get({ id: topic.id }).$promise.then(function(data) {
            plotHeatmap(data)
        })
    }

    function plotHeatmap(data) {
        if (Object.keys(data.zip_codes).length > 0) {
            var zipString = "("
            for (var key in data.zip_codes) {
                zipString += key + ","
            }

            zipString = zipString.slice(0, -1) + ")"
            setLayer(zipString);
            setZipColorQuery(data.zip_codes);
        } else {
            alert("Fuk u") //let user know their are no people interested in the topic
        }
    }

    GetUserTopics.get({ user_id: angular.fromJson(window.localStorage['user'])['id'] }).$promise.then(function(data) {
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
        }
    }

    function setColor(zipArray) {

        return [{
            where: 'Zipcode != ' + '60089',
            polygonOptions: {}
        }, {
            where: 'Zipcode = ' + '60089',
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


        var chunk = Math.floor(zipKeys.length / 9);
        var zipsThatGetLastColor = zipKeys.length % 9;
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
    }

    $scope.yao = [{
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [{
            "color": "#444444"
        }]
    }, {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{
            "color": "#f2f2f2"
        }]
    }, {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "road",
        "elementType": "all",
        "stylers": [{
            "saturation": -100
        }, {
            "lightness": 45
        }]
    }, {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [{
            "visibility": "simplified"
        }]
    }, {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{
            "visibility": "off"
        }]
    }, {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{
            "color": "#89d1d3"
        }, {
            "visibility": "on"
        }]
    }]
}])
