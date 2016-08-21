var account = angular.module('meetdown')

account.config(function (ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: '239604083106199'
    })
});

account.controller('AccountCtrl', ['$scope', 'ezfb', 'account', 'Users', 'createFBUser', 'Test', function($scope, ezfb, account, Users, createFBUser, Test) {

  updateLoginStatus(updateApiMe);

  $scope.login = function () {
    /**
     * Calling FB.login with required permissions specified
     * https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
     */
    ezfb.login(function (res) {
      if (res.authResponse) {
        updateLoginStatus(updateApiMe);
      }
    }, {scope: 'email,user_likes',return_scopes: true});
  };

  $scope.logout = function () {
    /**
     * Calling FB.logout
     * https://developers.facebook.com/docs/reference/javascript/FB.logout
     */
    ezfb.logout(function () {
      updateLoginStatus(updateApiMe);
    });
  };

  /**
   * For generating better looking JSON results
   */
  var autoToJSON = ['loginStatus', 'apiMe'];
  angular.forEach(autoToJSON, function (varName) {
    $scope.$watch(varName, function (val) {
      $scope[varName + 'JSON'] = JSON.stringify(val, null, 2);
    }, true);
  });

  /**
   * Update loginStatus result
   */
  function updateLoginStatus (more) {
    ezfb.getLoginStatus(function (res) {
      $scope.loginStatus = res;

      (more || angular.noop)();
    });
  }

  /**
   * Update api('/me') result
   */
  function updateApiMe () {
    ezfb.api('/me', {fields:'name, email, age_range, gender, books, games, picture, television, movies, music'}, function (res) {
      account.details = res;
      $scope.account = account
    });
  }

  $scope.postFBid = function(){
    $scope.login();
    // $scope.hello = Users.save(JSON.stringify({"a":11,"b":12}))
    // var object = new Object();
    // object.fb_id = "lol"
    // console.log(object)
    $scope.hello = Test.test({fb_id: "lol"})
  }
}]);
