var account = angular.module('meetdown')

account.config(function (ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: '239604083106199'
    })
});

account.controller('AccountCtrl', ['$scope', 'ezfb', 'account', 'Users', '$state', function($scope, ezfb, account, Users, $state) {
  $scope.account = account
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
      account.fbdetails = res;
    });
  }

  $scope.postFBid = function(){
      ezfb.login(function (res) {
      if (res.authResponse) {
        updateLoginStatus(updateApiMe);
        account.dbdetails = Users.save({fb_id: account.fbdetails.id})
        // need to write a method that tests if user interests are empty and then goto finder page based on answer
        $state.go('finder')
      }
    }, {scope: 'email,user_likes',return_scopes: true});
    // redirect to new page based on result
    // new page is intermediary page that checks if account has any interests, if not then go to wizard else go to profile/main page?!    
  }
}]);
