var account = angular.module('meetdown');

account.factory('account', function() {
  var obj = {
    fbdetails: [],
    dbdetails: []
  };

  return obj;
});
