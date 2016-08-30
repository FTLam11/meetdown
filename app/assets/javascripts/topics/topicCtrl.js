var topic = angular.module('meetdown');

topic.controller('TopicCtrl', ['$stateParams', '$scope', '$resource', 'Topic', function($stateParams, $scope, $resource, Topic) {
  $scope.id = $stateParams.topic_id
  $scope.topic = Topic.get({topic_id: $scope.id}).$promise.then(function(data) {
    $scope.topic = data.topic;
  })

  //function to get posts from server and factory
  //store to posts factory
  //add post to DB and factory
}])