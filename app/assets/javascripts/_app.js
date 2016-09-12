var meetdown = angular.module('meetdown', ['ui.router', 'templates', 'ezfb', 'ngResource', 'Devise', 'uiGmapgoogle-maps', 'nvd3ChartDirectives']);

meetdown.config(['$stateProvider',
  '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider) {
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
        url: '/posts/{id}', //double check syntax
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

      .state('profile', {
        url: '/profile',
        templateUrl: 'profile/_profile.html',
        controller: 'ProfileCtrl'
      })

      .state('profile_id', {
        url: '/profile/:id',
        templateUrl: 'profile/_profile.html',
        controller: 'ProfileCtrl'
      })

      .state('survey', {
        url: '/survey',
        templateUrl: 'survey/_survey.html',
        controller: 'SurveyCtrl'
      })

      .state('interestAtlas', {
        url: '/atlas',
        templateUrl: 'atlas/_atlas.html',
        controller: 'AtlasCtrl'
      }) //show interests on map

      .state('zipcodeAtlas', {
        url: '/zip',
        templateUrl: 'zipcode/_zipcode.html',
        controller: 'ZipcodeAtlasCtrl'
      }) //visualize interests by zip code

      .state('events', {
        url: '/events',
        templateUrl: 'events/_events.html',
        controller: 'EventCtrl'
      }) //show events on map

      .state('eventDetail', {
        url: '/events/{id}',
        templateUrl: 'event/_eventDetail.html',
        controller: 'EventDetailCtrl'
      }) //show detailed info for an event      

    $urlRouterProvider.otherwise('home');

    uiGmapGoogleMapApiProvider.configure({
      // key: 'api key',
      v: '3.20',
      libraries: "weather, geometry, visualization"
    });
}]);
