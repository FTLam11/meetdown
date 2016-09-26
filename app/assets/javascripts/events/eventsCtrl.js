var atlas = angular.module('meetdown')

atlas.controller('eventsCtrl', ['$scope', '$auth', '$stateParams', 'Attendees','CreateAttend','CancelAttend', function($scope,$auth,$stateParams,Attendees,CreateAttend, CancelAttend) {
	Attendees.get({id: $stateParams.id}).$promise.then(function(response){
		console.log(response)
		$scope.attendees=response.attendees
		$scope.hosts=response.hosts

	})

	$scope.cancelAttend=function(){
		CancelAttend.delete({event_id: $stateParams.id,user_id: $auth.getPayload().id}).$promise
		.then(function(response){$scope.attendees=response.attendees})	
	}

	$scope.createAttend=function(){
		CreateAttend.save({event_id: $stateParams.id,user_id: $auth.getPayload().id}).$promise
		.then(function(response){$scope.attendees=response.attendees})	
	}



}])