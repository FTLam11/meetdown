var survey = angular.module('meetdown');

survey.controller('SurveyCtrl', ['$scope', 'SubmitSurvey', '$state', 'Auth', '$location','$window', function($scope, SubmitSurvey, $state, Auth, $location, $window) {

$scope.submitInfo = function() {
    Auth.currentUser().then(function(res) {
    var profileID = res.id;
    SubmitSurvey.update({age: $scope.age, zip_code: $scope.zipcode, id: profileID}).$promise.then(function(res){
      window.localStorage['user'] = angular.toJson(res);
      $scope.showProfile(profileID);
    })
  })
  //add to account factory maybe
};

$scope.showProfile = function(profileID) {
  $location.path("/profile/" + profileID)
}

}]);