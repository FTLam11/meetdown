var survey = angular.module('meetdown');

survey.controller('SurveyCtrl', ['$scope', 'SubmitSurvey', '$state', 'Auth', '$location', function($scope, SubmitSurvey, $state, Auth, $location) {

  $scope.submitInfo = function() {
    Auth.currentUser(function(res) {
      console.log(res)
      // profileID = res.id;
      // console.log(profileID);
      SubmitSurvey.update({age: $scope.age, zipcode: $scope.zipcode, id: profileID});
      // $scope.showProfile();
    })
    //service to submit age and zip code
    //add to account factory maybe
  };

  $scope.showProfile = function(profileID) {
    $location.path("/profile" + profileID)
  }

}]);