var account = angular.module('meetdown');

account.factory('account', ['$http', function($http) {
  var obj = {
    details: [],
    hello: {}
  };

  obj.postAcct = function(data) {
    return $http.post('/users', data).success(function(data) {
      console.log(data)
    });
  };

  obj.test = function() {
    return $http.get('/users').success(function(data) {
      angular.copy(data,obj.hello);
      console.log(obj);
    });
  };

  obj.checkAcct = function() {

  }

  return obj;
}]);
