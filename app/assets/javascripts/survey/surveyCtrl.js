var survey = angular.module('meetdown');

survey.controller('SurveyCtrl', ['$scope', 'SubmitSurvey', '$state', '$location','$window', '$auth', 'RequestSignature', 'UploadToS3', 'DataURItoBlob', 'Authenticate', function($scope, SubmitSurvey, $state, $location, $window, $auth, RequestSignature, UploadToS3, DataURItoBlob, Authenticate) {
Authenticate();
$scope.submitInfo = function() {
    SubmitSurvey.update({age: $scope.age, zip_code: $scope.zipcode, id: $auth.getPayload().id, token: $auth.getToken()}).$promise.then(function(response){
      $auth.setToken(response.token);
      $scope.showProfile($auth.getPayload()['id']);
    })
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
    UploadToS3.upload({key: response.key, AWSAccessKeyId: response.AWSAccessKeyId, acl: "public-read", policy: response.policy, signature: response.signature, 'Content-Type': 'image/jpeg', file: $scope.croppedProfilePicBlob}).$promise.then(function(s3Response) {
      SubmitSurvey.update({id: $auth.getPayload().id, picture: "https://s3.amazonaws.com/media.meetdown.info/" + s3Response.key, token: $auth.getToken()}).$promise.then(function(response){
        $auth.setToken(response.token);
        $scope.showProfile($auth.getPayload()['id']);
      })
    });
  });

$scope.croppedProfilePicBlob = DataURItoBlob($scope.croppedProfilePic);
};
}]);