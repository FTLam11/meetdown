var survey = angular.module('meetdown');

survey.controller('SurveyCtrl', ['$scope', 'SubmitSurvey', '$state', '$location','$window', '$auth', 'RequestSignature', function($scope, SubmitSurvey, $state, $location, $window, $auth, RequestSignature) {

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
  RequestSignature.save({token: $auth.getToken()}).$promise(then(function(response) {
    
  });
  //client side verification of file to upload before making server request?
  //https://s3.amazonaws.com/media.meetdown.info
  //post
  //enctype="multipart/form-data"
}
}]);