var main = angular.module('meetdown');

main.controller('MainCtrl', ['$scope', 'posts','account', function($scope, posts,account){
  $scope.posts = posts.posts;

  $scope.addPost = function() {
    if(!$scope.title || $scope.title === '') { return; }
    $scope.posts.push({
      title: $scope.title, 
      link: $scope.link,
      upvotes: 0,
      comments: [
        {author: 'Fronk', body: 'Master Pooper', upvotes: 0},
        {author: 'Diu', body: 'Volcano Pooper', upvotes: 0},
      ]
    });
    $scope.title = '';
    $scope.link = '';
  };

  $scope.upVote = function(post) {
      post.upvotes += 1;
  }; 
}]);