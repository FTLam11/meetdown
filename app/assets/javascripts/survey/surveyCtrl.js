var survey = angular.module('meetdown');

survey.controller('SurveyCtrl', ['$scope', 'SubmitSurvey', '$state', 'Auth', '$location','$window', function($scope, SubmitSurvey, $state, Auth, $location, $window) {

  $scope.submitInfo = function() {
      Auth.currentUser().then(function(res) {
      console.log(res)
      profileID = res.id;
      console.log(profileID);
      SubmitSurvey.update({age: $scope.age, zip_code: $scope.zipcode, id: profileID}).then(function(res){
        
        window.localStorage.user = res
      })
      $scope.showProfile(profileID);
    })
    //service to submit age and zip code
    //add to account factory maybe
  };

  $scope.showProfile = function(profileID) {
    $location.path("/profile/" + profileID)
  }

}]);