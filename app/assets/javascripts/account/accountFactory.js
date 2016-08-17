var account = angular.module('meetdown');

account.factory('account', [function() {
  var obj = {
    details: []
  }
  return obj;
}]);