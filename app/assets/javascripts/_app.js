var meetdown = angular.module('meetdown', ['ui.router', 'templates', 'ngResource', 'uiGmapgoogle-maps', 'nvd3ChartDirectives', 'satellizer', 'ngFileUpload', 'ngImgCrop', 'ui.bootstrap']);

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
      .state('root',{
        url: '',
        abstract: true,
        views: {
          'header': {
            templateUrl: 'navbar/_nav.html',
            controller: 'NavCtrl'
          },
          'footer':{
            templateUrl: 'footer/_footer.html',
            controller: 'FooterCtrl'
          }
        }
      })

      .state('root.createEvent', {
        url: '/events/new', //double check syntax
        views: {
          'container@': {
            templateUrl: 'events/_createEvent.html',
            controller: 'createEventCtrl'
          }
        }
      })

      .state('root.eventPage', {
        url: '/events/{id}', //double check syntax
        views: {
          'container@': {
            templateUrl: 'events/_event.html',
            controller: 'eventsCtrl'
          }
        }
      })

      .state('root.account', {
        url: '/account',
        views: {
          'container@': {
            templateUrl: 'account/_account.html',
            controller: 'AccountCtrl'
          }
        }
      })

      .state('root.finder', {
        url: '/finder',
        views: {
          'container@': {
            templateUrl: 'finder/_finder.html',
            controller: 'FinderCtrl'
          }
        }
      })

      .state('root.topic', {
        url: '/topics/:topic_id',
        views: {
          'container@': {
            templateUrl: 'topics/_topic.html',
            controller: 'TopicCtrl'
          }
        }
      })

      .state('root.profile', {
        url: '/profile',
        views: {
          'container@': {
            templateUrl: 'profile/_profile.html',
            controller: 'ProfileCtrl'
          }
        }
      })

      .state('root.profile_id', {
        url: '/profile/:id',
        views: {
          'container@': {
            templateUrl: 'profile/_profile.html',
            controller: 'ProfileCtrl'
          }
        }
      })

      .state('root.survey', {
        url: '/survey',
        views: {
          'container@': {
            templateUrl: 'survey/_survey.html',
            controller: 'SurveyCtrl'
          }
        }
      })

      .state('root.interestAtlas', {
          url: '/atlas',
          views: {
            'container@': {
              templateUrl: 'atlas/_atlas.html',
              controller: 'AtlasCtrl'
            }
          }
        }) //show interests on map

      .state('root.zipcodeAtlas', {
          url: '/zip',
          views: {
            'container@': {
              templateUrl: 'zipcode/_zipcode.html',
              controller: 'ZipcodeAtlasCtrl'
            }
          }
        }) //visualize interests by zip code

      .state('root.events', {
          url: '/events',
          views: {
            'container@': {
              templateUrl: 'events/_events.html',
              controller: 'EventCtrl'
            }
          }
        }) //show events on map

      .state('root.eventDetail', {
          url: '/events/{id}',
          views: {
            'container@': {
              templateUrl: 'event/_eventDetail.html',
              controller: 'EventDetailCtrl'
            }
          }
        }) //show detailed info for an event       

    $urlRouterProvider.otherwise('root.account');

    uiGmapGoogleMapApiProvider.configure({
      // key: 'api key',
      v: '3.20',
      libraries: "weather, geometry, visualization"
    });
}]);
