var survey = angular.module('meetdown');

survey.controller('surveyCtrl', ['$scope', 'SubmitSurvey', '$auth', '$uibModalInstance', 'Authenticate', function($scope, SubmitSurvey, $auth, $uibModalInstance, Authenticate) {
Authenticate();

$scope.submitInfo = function() {
    SubmitSurvey.update({zip_code: $scope.zipcode, id: $auth.getPayload().id, token: $auth.getToken()}).$promise.then(function(response){
      $auth.setToken(response.token);
      $uibModalInstance.close();
    })
};

$scope.cancel = function() {
  $uibModalInstance.close();
};
}]);