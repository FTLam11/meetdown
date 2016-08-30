var main = angular.module('meetdown');

main.controller('ProfileCtrl', ['$scope', '$stateParams','$window','User', function($scope, $stateParams,$window,User){
setProfile()
$scope.user = window.localStorage.user
console.log(User.get({user_id:1}))

function setProfile(){
	if ($stateParams.id)
		{$scope.user_profile=$stateParams.id}
		else
		{$scope.user_profile=$window.localStorage.user.id}
}

}]);