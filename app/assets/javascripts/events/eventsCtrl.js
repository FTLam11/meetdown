var event = angular.module('meetdown')

event.controller('eventsCtrl', ['$scope', '$auth', '$stateParams', 'Attendees', 'CreateAttend', 'CancelAttend', 'GetEvent', function($scope, $auth, $stateParams, Attendees, CreateAttend, CancelAttend, GetEvent) {
  GetEvent.get({ id: $stateParams.id }).$promise.then(function(response) {
    $scope.event = response.event
  });

  Attendees.get({ id: $stateParams.id }).$promise.then(function(response) {
    $scope.attendees = response.attendees;
    $scope.hosts = response.hosts;
  });

  $scope.cancelAttend = function() {
    CancelAttend.delete({ event_id: $stateParams.id, user_id: $auth.getPayload().id }).$promise
      .then(function(response) { $scope.attendees = response.attendees })
  };

  $scope.createAttend = function() {
    CreateAttend.save({ event_id: $stateParams.id, user_id: $auth.getPayload().id }).$promise
      .then(function(response) { $scope.attendees = response.attendees })
  };
}])
