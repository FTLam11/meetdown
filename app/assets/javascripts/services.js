var ang = angular.module('meetdown')

ang.service('Users', function($resource) {
  return $resource("http://localhost:3000/users/")
})

ang.service('UserEventList', function($resource) {
  return $resource("/events/userEventList")
})

ang.service('RequestSignature', function($resource) {
  return $resource("http://localhost:3000/users/s3")
})

ang.service('UploadToS3', function($resource) {
  return $resource("https://s3.amazonaws.com/media.meetdown.info", {}, {
    upload: {
      method: "POST",
      skipAuthorization: true,
      transformRequest: function(data) {
        if (data === undefined)
          return data;

        var fd = new FormData();
        angular.forEach(data, function(value, key) {
          if (value instanceof FileList) {
            if (value.length == 1) {
              fd.append(key, value[0]);
            } else {
              angular.forEach(value, function(file, index) {
                fd.append(key + '_' + index, file);
              });
            }
          } else {
            fd.append(key, value);
          }
        });
        return fd;
      },
      headers: { 'Content-Type': undefined }
    }
  })
})

ang.service('SubmitEventPicture', function($resource) {
  return $resource("/events/:id", { id: "@id" }, { update: { method: 'PUT' } })
})

ang.service('Suggest', function($resource) {
  return $resource("/topics/suggest", { body: "@body" })
})

ang.service('CreateEvent', function($resource) {
  return $resource("/events/create")
})

ang.service('CreateAttend', function($resource) {
  return $resource("/events/createAttend")
})

ang.service('CancelAttend', function($resource) {
  return $resource("/events/cancelAttend")
})

ang.service('GetEvent', function($resource) {
  return $resource("/events/:id", { id: "@id" })
})

ang.service('Comment', function($resource) {
  return $resource("/comments/:id", { id: "@id" })
})

ang.service('PostComment', function($resource) {
  return $resource("/events/:id/user/:user_id/comments", { id: "@id",user_id:"@user_id" })
})

ang.service('User', function($resource) {
  return $resource("/users/:user_id", { user_id: "@user_id" })
})

ang.service('CancelAttend', function($resource) {
  return $resource("/events/cancelAttend", { update: { method: 'DELETE' } })
})

ang.service('ZipCount', function($resource) {
  return $resource("/zip_code/:id", { id: "@topic_id" })
})

ang.service('FindOrCreateFb', function($resource) {
  return $resource("http://localhost:3000/users/fb")
})

ang.service('Topics', function($resource) {
  return $resource("/topics")
})

ang.service('Topic', function($resource) {
  return $resource("/topics/:topic_id", { topic_id: "@topic_id" })
})

ang.service('GetUserTopics', function($resource) {
  return $resource("/users/:user_id/topics", { user_id: "@user_id" })
})

ang.service('CreateFBUser', function($resource) {
  return $resource("/users", { fb_id: "@fb_id" })
})

ang.service('CreateInterest', function($resource) {
  return $resource("/interests")
})

ang.service('CreateAction', function($resource) {
  return $resource("/actions")
})

ang.service('SubmitSurvey', function($resource) {
  return $resource("/users/:id", { id: "@id" }, { update: { method: 'PUT' } })
})

ang.service('GetZipTopics', function($resource) {
  return $resource("/zip_code/:zip_code/topics", { zip_code: "@zip_code" })
})

ang.service('StyleMap', function() {
  return {
    center: { latitude: 42, longitude: -88 },
    options: { minZoom: 3, maxZoom: 13 },
    zoom: 9,
    styles: [{
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
  }
})

ang.service('DataURItoBlob', function() {
  return function(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    };
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }
})

ang.service('FileManager', function() {
  return function(event, $scope, $apply) {
    var file = event.currentTarget.files[0];
    var reader = new FileReader();
    reader.onload = function(event, $scope, $apply) {
      $scope.$apply(function($scope) {
        $scope.profilePic = event.target.result;
      });
    };
    reader.readAsDataURL(file);
  }
})

ang.service('Authenticate', function($auth, $location) {
  return function() {
    if (!$auth.isAuthenticated()) {
      $location.path('/account');
    };
  }
})
