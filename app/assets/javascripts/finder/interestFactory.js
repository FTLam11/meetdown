var account = angular.module('meetdown');

account.factory('interests', function() {
  var obj = {
  	user_interests: [],
    interests: ["yodeling","yo-yoing","yo yo ma","yoloing"]
  };

  obj.checkAcct = function() {
  }

  return obj;
});
