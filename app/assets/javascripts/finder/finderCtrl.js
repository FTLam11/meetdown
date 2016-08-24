var main = angular.module('meetdown');

main.controller('FinderCtrl', ['$scope', 'account', 'ezfb', function($scope, account,ezfb){
$scope.account = account
$scope.interests = ["yodeling","yo-yoing","yo yo ma","yoloing"]

}]);