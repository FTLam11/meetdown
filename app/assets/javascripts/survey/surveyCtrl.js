var survey = angular.module('meetdown');

survey.controller('SurveyCtrl', ['$scope', 'SubmitSurvey', '$state', '$location','$window', '$auth', 'RequestSignature', 'UploadToS3', function($scope, SubmitSurvey, $state, $location, $window, $auth, RequestSignature, UploadToS3) {

$scope.submitInfo = function() {
    SubmitSurvey.update({age: $scope.age, zip_code: $scope.zipcode, id: $auth.getPayload().id, token: $auth.getToken()}).$promise.then(function(response){
      $auth.setToken(response.token);
      $scope.showProfile($auth.getPayload()['id']); //call with no argument to go to /profile
    })
  //add to account factory maybe
};

$scope.showProfile = function(profileID) {
  $location.path("/profile/" + profileID)
};

$scope.profilePic = "";
$scope.croppedProfilePic = "";

var fileManager = function(event) {
  var file = event.currentTarget.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    $scope.$apply(function($scope) {
      $scope.profilePic = event.target.result;
    });
  };
  reader.readAsDataURL(file);
};

angular.element(document.querySelector('#fileInput')).on('change', fileManager);

$scope.updateProfilePic = function() {
  RequestSignature.save({token: $auth.getToken(), key: $scope.file.name, user: $auth.getPayload()}).$promise.then(function(response) {
    // console.log(response);
    UploadToS3.upload({key: response.key, AWSAccessKeyId: response.AWSAccessKeyId, acl: "public-read", policy: response.policy, signature: response.signature, 'Content-Type': 'image/jpeg', file: $scope.croppedProfilePicBlob}).$promise.then(function(s3Response) {
      SubmitSurvey.update({id: $auth.getPayload().id, picture: "https://s3.amazonaws.com/media.meetdown.info/" + s3Response.key, token: $auth.getToken()}).$promise.then(function(response){
        $auth.setToken(response.token);
        $scope.showProfile($auth.getPayload()['id']);
      })
      // save the image URL to database, redirect to user's profile page
    });
  });

function dataURItoBlob(dataURI) {
  var binary = atob(dataURI.split(',')[1]);
  var array = [];
  for(var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
  }
  return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
};

$scope.croppedProfilePicBlob = dataURItoBlob($scope.croppedProfilePic);
  //client side verification of file to upload before making server request?
  //https://s3.amazonaws.com/media.meetdown.info
  //post
  //enctype="multipart/form-data"
};
}]);