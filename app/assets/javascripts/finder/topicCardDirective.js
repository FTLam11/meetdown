var finder = angular.module('meetdown')

finder.directive('topicCard', function() {
  return {
    restrict: 'E',
    scope: { topic: topic },
    templateUrl: 'finder/_topicCard.html'
  }
})
