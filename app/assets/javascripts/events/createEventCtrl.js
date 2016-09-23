var atlas = angular.module('meetdown')

atlas.controller('createEventCtrl', ['$scope', '$auth','CreateEvent','$window', function($scope,$auth,CreateEvent,$window) {

	$scope.create= function(){
		CreateEvent.save({name: $scope.eventName, location: $scope.location, address: $scope.address, description: $scope.description, user: $auth.getPayload()['id'], token: $auth.getToken()}).$promise.then(alert("hello"))
	}
	$scope.newMap = function(){
		$window.open('https://www.google.com/maps/search/'+$scope.location, '_blank')
	}

}])