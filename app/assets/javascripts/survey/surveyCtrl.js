var survey = angular.module('meetdown');

survey.directive('fileUpload', [function() {
  return {
    link: function(scope, element, attrs) {
      element.on('change', function(event) {
        var files = event.target.files;
        // console.log(files[0].name);
        // console.log(files[0].size);
      });
    },
    controller: ['$scope', '$element', '$attrs', function($scope, $element, $attrs) {
      $element.on('change', function(event) {
        $scope.file = event.target.files[0].name;
      });
    }]
  }
}]);

survey.controller('SurveyCtrl', ['$scope', 'SubmitSurvey', '$state', '$location','$window', '$auth', 'RequestSignature', 'UploadToS3', function($scope, SubmitSurvey, $state, $location, $window, $auth, RequestSignature, UploadToS3) {

$scope.submitInfo = function() {
    SubmitSurvey.update({age: $scope.age, zip_code: $scope.zipcode, id: $auth.getPayload().id, token: $auth.getToken()}).$promise.then(function(response){
      $auth.setToken(response.token);
      $scope.showProfile($auth.getPayload()['id']);
    })
  //add to account factory maybe
};

$scope.showProfile = function(profileID) {
  $location.path("/profile/" + profileID)
}

$scope.updateProfilePic = function() {
  RequestSignature.save({token: $auth.getToken(), key: $scope.file, user: $auth.getPayload()}).$promise.then(function(response) {
    console.log(response);
    console.log($scope.file);
    UploadToS3.upload({key: response.key, AWSAccessKeyId: response.AWSAccessKeyId, acl: "public-read", success_action_redirect: "http://localhost:3000/#/profile", policy: response.policy, signature: response.signature, 'Content-Type': 'image/jpeg', file: $scope.file}).$promise.then(function(s3Response) {
      console.log(s3Response);
    });
  });
  //client side verification of file to upload before making server request?
  //https://s3.amazonaws.com/media.meetdown.info
  //post
  //enctype="multipart/form-data"
};
}]);