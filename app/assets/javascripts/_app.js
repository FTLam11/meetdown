var meetdown = angular.module('meetdown', ['ui.router', 'templates', 'ezfb', 'ngResource']);

meetdown.config(['$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'MainCtrl',
        /*resolve: {
          postPromise: ['posts', function(posts) {
            return posts.getAll();
          }]
        }*/
      })

      .state('posts', {
        url: '/posts/{id}',
        templateUrl: 'posts/_posts.html',
        controller: 'PostsCtrl'
      })

      .state('account', {
        url: '/account',
        templateUrl: 'account/_account.html',
        controller: 'AccountCtrl'
      })

      .state('finder', {
        url: '/finder',
        templateUrl: 'finder/_finder.html',
        controller: 'FinderCtrl'
      })

      .state('topic', {
        url: '/topics/:topic_id',
        templateUrl: 'topics/_topic.html',
        controller: 'TopicCtrl'
      })

    // $urlRouterProvider.otherwise('home');
}]);
