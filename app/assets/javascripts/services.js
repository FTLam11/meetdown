angular.module('meetdown')

.service('Users', function($resource){
  return $resource("http://localhost:3000/users")
})

.service('Topics', function($resource) {
  return $resource("/topics")
})

.service('Topics', function($resource) {
  return $resource("/topic/:topic_id", {topic_id: "@topic_id"})
})

.service('CreateFBUser', function($resource){
  return $resource("/users", {fb_id:"@fb_id"})
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

.factory('User', function($resource){
  return $resource("http://slice-it-app.herokuapp.com/customers.json");
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
