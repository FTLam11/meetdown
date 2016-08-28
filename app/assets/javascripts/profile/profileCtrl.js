var main = angular.module('meetdown');

main.controller('ProfileCtrl', ['$scope', '$stateParams', 'account', 'ezfb','$window', function($scope, $stateParams,account,ezfb,$window){
$scope.account = account
setProfile()
console.log($stateParams)

function setProfile(){
	if ($stateParams.id)
		{$scope.user_profile=$stateParams.id}
		else
		{$scope.user_profile=$window.localStorage.id}
}

}]);