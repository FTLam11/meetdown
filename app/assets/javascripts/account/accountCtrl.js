var account = angular.module('meetdown')

account.config(function (ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: '239604083106199'
    })
});

account.controller('AccountCtrl', ['$scope', 'ezfb', 'account', 'Users','UsersFB', '$state', 'Auth', '$auth', function($scope, ezfb, account, Users, UsersFB, $state, Auth, $auth) {
  $scope.account = account
  updateLoginStatus(updateApiMe);

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider);
  };

  $scope.login = function () {
     // Calling FB.login with required permissions specified
     // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.0
    // ezfb.login(function (res) {
    //   if (res.authResponse) {
    //     updateLoginStatus(updateApiMe);
    //   }
    // }, {scope: 'email,user_likes',return_scopes: true});
    Auth.login({email: $scope.email, password: $scope.password})
  };

  $scope.logout = function () {
     // Calling FB.logout
     // https://developers.facebook.com/docs/reference/javascript/FB.logout
    // ezfb.logout(function () {
    //   updateLoginStatus(updateApiMe);
    // });
  Auth.logout()
  };
   // Update loginStatus result
  function updateLoginStatus (more) {
    ezfb.getLoginStatus(function (res) {
      $scope.loginStatus = res;

      (more || angular.noop)();
    });
  }

   // Update api('/me') result
  function updateApiMe () {
    ezfb.api('/me', {fields:'name, email, age_range, gender, books, games, picture, television, movies, music'}, function (res) {
      account.fbdetails = res;
    });
  }

  $scope.postFBid = function(){
      ezfb.login(function (res) {
      if (res.authResponse) {
        updateLoginStatus(updateApiMe);
        Auth.login({})
        Auth.register({fb_id: account.fbdetails.id,email:""})
        // need to write a method that tests if user interests are empty and then goto finder page based on answer
        // $state.go('finder')
      }
    }, {scope: 'email,user_likes',return_scopes: true});
    // redirect to new page based on result
    // new page is intermediary page that checks if account has any interests, if not then go to wizard else go to profile/main page?!    
  }

  $scope.register = function() {
    Auth.register({email: $scope.email, username: $scope.username, password: $scope.password}).then(function(data) {
      Auth.currentUser().then(function(res){
        window.localStorage['user'] = angular.toJson(res)
        // console.log(angular.fromJson(window.localStorage['user']))
        // TO DO: how to stop the server from sending back plain text password
        $state.go('finder');
      })
    })
  }
}]);
