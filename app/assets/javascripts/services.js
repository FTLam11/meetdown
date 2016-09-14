angular.module('meetdown')

.service('Users', function($resource){
  return $resource("http://localhost:3000/users/")
})

.service('Suggest', function($resource) {
  return $resource("/topics/suggest", {body:"@body"})
})

.service('User', function($resource) {
  return $resource("/users/:user_id", {user_id: "@user_id"})
})

.service('ZipCount', function($resource) {
  return $resource("/zip_code/:id", {id: "@topic_id"})
})

.service('UsersFB', function($resource){
  return $resource("http://localhost:3000/users/fb")
})

.service('Topics', function($resource) {
  return $resource("/topics")
})

.service('Topic', function($resource) {
  return $resource("/topics/:topic_id", {topic_id: "@topic_id"})
})

.service('GetUserTopics', function($resource) {
  return $resource("/users/:user_id/topics", {user_id: "@user_id"})
})

.service('CreateFBUser', function($resource){
  return $resource("/users", {fb_id:"@fb_id"})
})

.service('CreateEvent', function($resource){
  return $resource("/users", {fb_id:"@fb_id"})
})

.service('CreateInterest', function($resource){
  return $resource("/interests")
})

.service('CreateAction', function($resource){
  return $resource("/actions")
})

.service('SubmitSurvey', function($resource){
  return $resource("/users/:id", {id: "@id"}, {update: {method: 'PUT'}})
})

.service('GetZipTopics', function($resource){
  return $resource("/zip_code/:zip_code/topics", {zip_code: "@zip_code"})
})

.service('StyleMap', function() {
  return {
        center: { latitude: 42, longitude: -88 },
        options: { minZoom: 3, maxZoom: 13 },
        zoom: 9,
        styles:  [{
          "featureType": "administrative",
          "elementType": "labels.text.fill",
          "stylers": [{
              "color": "#444444"
          }]
        }, {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [{
              "color": "#f2f2f2"
          }]
        }, {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [{
              "visibility": "off"
          }]
        }, {
          "featureType": "road",
          "elementType": "all",
          "stylers": [{
              "saturation": -100
          }, {
              "lightness": 45
          }]
        }, {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [{
              "visibility": "simplified"
          }]
        }, {
          "featureType": "road.arterial",
          "elementType": "labels.icon",
          "stylers": [{
              "visibility": "off"
          }]
        }, {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [{
              "visibility": "off"
          }]
        }, {
          "featureType": "water",
          "elementType": "all",
          "stylers": [{
              "color": "#89d1d3"
          }, {
              "visibility": "on"
          }]
      }]
    }
})

.service('Test', function($http){
  return {
   test: function(data) {
    console.log(data)
    $http({url: "/users", method: 'POST', dataType: "json", data: data})
    }
  }
})

.factory('UserSession', function($resource){
  return $resource("http://slice-it-app.herokuapp.com/customers/sign_in.json");
})

.factory('Charge', function($resource){
  return $resource("http://slice-it-app.herokuapp.com/charges.json");
})

.factory('AddTransaction', function($resource){
  return $resource("http://slice-it-app.herokuapp.com/bills/:bill_id/transactions",{id: "@id", username: "@username", bill_id: "@bill_id"})
})

.factory('Transaction', function($resource){
  return $resource("http://slice-it-app.herokuapp.com/bills/:bill_id/transactions/:id.json",{id: "@id", bill_id: 1})
})

.factory('PayUp', function($resource){
  return $resource("http://slice-it-app.herokuapp.com/bills/:bill_id/transactions/:id",{id: "@id", username: "@username", bill_id: "@bill_id", amount: "@amount"},{ update: {method: 'PUT'}})
})

.factory('AssignItem', function($resource){
  return $resource("http://slice-it-app.herokuapp.com/orders/:id",{id: "@id", transaction_id: "@transaction_id", user_id: "@user_id"},{ update: {method: 'PUT'}})
})

.factory('Customer', function($resource){
  return $resource("http://slice-it-app.herokuapp.com/customers/:id.json",{id: "@id"},{ update: {method: 'PUT'}})
})

.service('BlankService', [function(){

}]);
