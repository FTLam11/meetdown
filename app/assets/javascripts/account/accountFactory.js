var account = angular.module('meetdown');

account.factory('account', ['$http', function($http) {
  var obj = {
    details: [],
    hello: {}
  };

  obj.postAcct = function(data) {
    return $http.post('/account.json', data).success(function(data) {
      angular.copy(data, obj.response);
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