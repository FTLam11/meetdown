var atlas = angular.module('meetdown')

atlas.controller('createEventCtrl', ['$scope', '$auth', 'CreateEvent', '$window', '$location', 'SubmitEventPicture', 'RequestSignature', 'UploadToS3', 'DataURItoBlob', function($scope, $auth, CreateEvent, $window, $location, SubmitEventPicture, RequestSignature, UploadToS3, DataURItoBlob) {
  $scope.eventPic = "";
  $scope.croppedEventPic = "";

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

$scope.updateProfilePic = function() {
  RequestSignature.save({token: $auth.getToken(), key: $scope.file.name, user: $auth.getPayload()}).$promise.then(function(response) {
    UploadToS3.upload({key: response.key, AWSAccessKeyId: response.AWSAccessKeyId, acl: "public-read", policy: response.policy, signature: response.signature, 'Content-Type': 'image/jpeg', file: $scope.croppedEventPicBlob}).$promise.then(function(s3Response) {
      SubmitEventPicture.update({id: window.localStorage.eventID, picture: "https://s3.amazonaws.com/media.meetdown.info/" + s3Response.key, token: $auth.getToken()})
    });
  });

$scope.croppedEventPicBlob = DataURItoBlob($scope.croppedEventPic);
};

$scope.create = function() {
  CreateEvent.save({ name: $scope.eventName, location: $scope.location, address: $scope.address, description: $scope.description, user: $auth.getPayload().id, token: $auth.getToken() })
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
