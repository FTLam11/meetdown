var main = angular.module('meetdown');

main.controller('FinderCtrl', ['$scope', 'account', 'interests', function($scope, account,interests){
$scope.account = account
$scope.interests = interests.interests
$scope.user_interests = interests.user_interests
$scope.duplicate = false


$scope.pushInterest = function(){
	if ($scope.user_interests.indexOf($scope.keyword)===-1) {
		$scope.user_interests.push($scope.keyword)
		console.log ($scope.interests)
		$scope.keyword = ''
		console.log(interests.user_interests)
	}
	else {
		$scope.duplicate=true
	}
}

$scope.resetDuplicate = function(){
	$scope.duplicate=false
}


}]);