var account = angular.module('meetdown');

account.factory('account', [function() {
  var obj = {
    details: []
  }

  obj.postAcct = function(data) {
    return $http.post('/account.json', data).success(function(data) {
      angular.copy(data, obj.response);
    });
  };

  obj.checkAcct = function() {
    
  }

  return obj;
}]);