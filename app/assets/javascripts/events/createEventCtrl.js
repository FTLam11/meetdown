var atlas = angular.module('meetdown')

atlas.controller('createEventCtrl', ['$scope', '$auth', 'CreateEvent', '$window', '$location', 'SubmitEventPicture', 'RequestSignature', 'UploadToS3', 'DataURItoBlob', 'GetUserTopics', function($scope, $auth, CreateEvent, $window, $location, SubmitEventPicture, RequestSignature, UploadToS3, DataURItoBlob,GetUserTopics) {
  $scope.eventPic = "";
  $scope.croppedEventPic = "";
  $scope.eventTopics = []
  $scope.zipArray = []
  $scope.datepicker={}
  $scope.datepicker.opened = false
   $scope.datepicker.options = {
    formatYear: 'yy',
    startingDay: 1,
    showWeeks:false
  };
  var d = new Date();
  d.setHours( 1 );
  d.setMinutes( 0 );
  $scope.min = d;

  var d = new Date();
  d.setHours( 12 );
  d.setMinutes( 59 );
  $scope.max = d;

  $scope.datepickerOpen = function(){$scope.datepicker.opened=true}

  var fileManager = function(event) {
  var file = event.currentTarget.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    $scope.$apply(function($scope) {
      $scope.eventPic = event.target.result;
    });
  };
  reader.readAsDataURL(file);
};

angular.element(document.querySelector('#fileInput')).on('change', fileManager);

GetUserTopics.get({ user_id: $auth.getPayload()['id'] }).$promise.then(function(data) {
      if (data.user_topics) {
          $scope.userTopics = data.user_topics;
      }
    });

$scope.addTopicToEvent = function (topic) {
  $scope.eventTopics.push(topic)
  $scope.userTopics.splice($scope.userTopics.indexOf(topic),1)
}

$scope.addZip = function(){
  $scope.zipArray.push($scope.zip)
}

$scope.removeZip = function(zip){
  $scope.zipArray.splice($scope.zip.indexOf(zip),1)
}

$scope.removeTopicFromEvent = function (topic) {
  $scope.userTopics.push(topic)
  $scope.eventTopics.splice($scope.eventTopics.indexOf(topic),1)
}

$scope.updateProfilePic = function() {
  RequestSignature.save({token: $auth.getToken(), key: $scope.file.name, user: $auth.getPayload()}).$promise.then(function(response) {
    UploadToS3.upload({key: response.key, AWSAccessKeyId: response.AWSAccessKeyId, acl: "public-read", policy: response.policy, signature: response.signature, 'Content-Type': 'image/jpeg', file: $scope.croppedEventPicBlob}).$promise.then(function(s3Response) {
      
    SubmitEventPicture.update({id: window.localStorage.eventID, picture: "https://s3.amazonaws.com/media.meetdown.info/" + s3Response.key, token: $auth.getToken()})
    });
  });

$scope.croppedEventPicBlob = DataURItoBlob($scope.croppedEventPic);
};

$scope.create = function() {
  CreateEvent.save({ name: $scope.eventName, datetime: $scope.dt, location: $scope.location, address: $scope.address, description: $scope.description, user: $auth.getPayload().id, token: $auth.getToken(),zips: $scope.zipArray, topics: $scope.eventTopics })
    .$promise.then(function(response) {
      window.localStorage['eventID'] = response.event.id;
      $scope.updateProfilePic();
      $location.path('/events/' + response.event.id)
    })
};

$scope.newMap = function() {
  $window.open('https://www.google.com/maps/search/' + $scope.location, '_blank')
};
}])
