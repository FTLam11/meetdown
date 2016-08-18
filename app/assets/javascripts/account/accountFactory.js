var account = angular.module('meetdown');

account.factory('account', [function() {
  var obj = {
    details: []
  }

  obj.postAcct = function(data) {
    return $http.post('/users', data).success(function(data) {
      console.log(data)
    });
  };

  obj.checkAcct = function() {
    
  }

  return obj;
}]);