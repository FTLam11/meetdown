var posts = angular.module('poopNews');

posts.factory('posts', [function() {
  var obj = {
    posts: []
  };

  return obj;
}]);