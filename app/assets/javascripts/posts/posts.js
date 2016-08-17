var posts = angular.module('meetdown');

posts.factory('posts', [function() {
  var obj = {
    posts: []
  };

  return obj;
}]);