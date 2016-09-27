var atlas = angular.module('meetdown')

atlas.controller('createEventCtrl', ['$scope', '$auth','CreateEvent','$window','$location', function($scope,$auth,CreateEvent,$window, $location) {

	$scope.create= function(){		
		console.log($auth.getPayload())
				console.log($auth.getPayload().id)

		CreateEvent.save({name: $scope.eventName, location: $scope.location, address: $scope.address, description: $scope.description, user: $auth.getPayload().id, token: $auth.getToken()})
		.$promise.then(function(response)
			{console.log(response)
				$location.path('/events/'+response.event.id)

			}
				)
		}
	$scope.newMap = function(){
		$window.open('https://www.google.com/maps/search/'+$scope.location, '_blank')
	}

}])