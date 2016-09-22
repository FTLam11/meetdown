var survey = angular.module('meetdown');

survey.controller('SurveyCtrl', ['$scope', 'SubmitSurvey', '$state', '$location','$window', '$auth', function($scope, SubmitSurvey, $state, $location, $window, $auth) {

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


}]);