var event = angular.module('meetdown')

event.controller('eventsCtrl', ['$scope', '$auth', '$stateParams', 'CreateAttend', 'CancelAttend', 'GetEvent','PostComment','Comment', function($scope, $auth, $stateParams, CreateAttend, CancelAttend, GetEvent,PostComment,Comment) {
  $scope.content = ""

  GetEvent.get({ id: $stateParams.id }).$promise.then(function(response) {
    $scope.event = response.event
    $scope.comments = response.comments
    $scope.attendees = response.attendees;
    $scope.hosts = response.hosts;
  });



  $scope.cancelAttend = function() {
    CancelAttend.delete({ event_id: $stateParams.id, user_id: $auth.getPayload().id }).$promise
      .then(function(response) { $scope.attendees = response.attendees })
  };

  $scope.postComment = function(){
    PostComment.save({ id: $stateParams.id, user_id: $auth.getPayload().id, content: $scope.content }).$promise
      .then(function(response) { $scope.comments = response.comments })
  }

  $scope.deleteComment = function(id){
    Comment.delete({ id: id }).$promise
      .then(function(response) { $scope.comments = response.comments })
  }

  $scope.createAttend = function() {
    CreateAttend.save({ event_id: $stateParams.id, user_id: $auth.getPayload().id }).$promise
      .then(function(response) { $scope.attendees = response.attendees })
  };
}])
