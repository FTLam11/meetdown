var posts = angular.module('meetdown');

posts.factory('posts', ['$http', function($http) {
  var obj = {
    posts: []
  };

  obj.getAll = function() {
    return $http.get('/posts.json').success(function(data) {
      angular.copy(data, obj.posts);
    });
  };

  return obj;
}]);