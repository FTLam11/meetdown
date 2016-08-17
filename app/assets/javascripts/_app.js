var poop = angular.module('meetdown', ['ui.router', 'templates', 'ezfb']);

poop.config(['$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'home/_home.html',
        controller: 'MainCtrl'
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

    $urlRouterProvider.otherwise('home');
}]);

