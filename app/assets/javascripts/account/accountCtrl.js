var account = angular.module('meetdown')

account.config(function (ezfbProvider) {
  ezfbProvider.setInitParams({
    appId: '239604083106199'
    })
});

account.controller('AccountCtrl', ['$scope', 'ezfb', 'account', 'Users','FindOrCreateFb', '$state', 'Auth', '$auth', function($scope, ezfb, account, Users, FindOrCreateFb, $state, Auth, $auth) {
  $scope.account = account

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider)
    alert("yoo")
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

  // $scope.FindOrCreateFb = function(){
  //   FindOrCreateFb.save({"token":localStorage['satellizer_token']}).$promise.then(function(data){
  //     console.log(data)
  //   })
  // }

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
