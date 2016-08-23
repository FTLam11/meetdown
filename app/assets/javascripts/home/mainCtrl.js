var main = angular.module('meetdown');

main.controller('MainCtrl', ['$scope', 'account', 'ezfb', function($scope, account,ezfb){
$scope.account = account
  $scope.redirect = function() {
    if (account.dbdetails()) {
      // redirect to thing
      // else redirect to registration page

    }
  }
  $scope.signedIn = function(){
  }

}]);