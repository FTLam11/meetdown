var meetdown = angular.module('meetdown', ['ui.router', 'templates', 'ezfb', 'ngResource', 'uiGmapgoogle-maps', 'nvd3ChartDirectives', 'satellizer', 'ngFileUpload', 'ngImgCrop', 'ui.bootstrap']);

meetdown.config(['$stateProvider',
  '$urlRouterProvider', 'uiGmapGoogleMapApiProvider', '$authProvider', function($stateProvider, $urlRouterProvider, uiGmapGoogleMapApiProvider, $authProvider) {
    $authProvider.facebook({
      clientId: '239604083106199',
      name: 'facebook',
      url: '/users/fb',
      authorizationEndpoint: 'https://www.facebook.com/v2.5/dialog/oauth',
      redirectUri: window.location.origin + '/',
      requiredUrlParams: ['display', 'scope'],
      scope: ['email','user_likes'],
      scopeDelimiter: ',',
      display: 'popup',
      oauthType: '2.0',
      popupOptions: { width: 580, height: 400 }
    });

    $authProvider.oauth2({
      name: 'meetdown',
      url: '/auth/',
      clientId: null,
      redirectUri: null,
      authorizationEndpoint: null,
      defaultUrlParams: ['response_type', 'client_id', 'redirect_uri'],
      requiredUrlParams: null,
      optionalUrlParams: null,
      scope: null,
      scopePrefix: null,
      scopeDelimiter: null,
      state: null,
      oauthType: null,
      popupOptions: null,
      responseType: 'code',
      responseParams: {
        code: 'code',
        clientId: 'clientId',
        redirectUri: 'redirectUri'
      }
    });

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

      .state('createEvent', {
        url: '/events/create', //double check syntax
        templateUrl: 'events/_createEvent.html',
        controller: 'createEventCtrl'
      })

      .state('eventPage', {
        url: '/events/{id}', //double check syntax
        templateUrl: 'events/_event.html',
        controller: 'eventsCtrl'
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
