var account = angular.module('meetdown');

account.factory('account', function() {
  var obj = {
    fbdetails: [],
    dbdetails: [],
    hello: {},
  };

  obj.checkAcct = function() {
  }

  return obj;
});
