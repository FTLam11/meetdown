var account = angular.module('meetdown')

account.controller('AccountCtrl', ['$scope', 'account', 'Users','FindOrCreateFb', '$state', '$auth', function($scope, account, Users, FindOrCreateFb, $state, $auth) {
  $scope.account = account;


  $scope.authenticate = function(provider) {
    $auth.authenticate(provider).then(function(response) {
    $auth.setToken(response.data.token);
    });
  };

  $scope.login = function () {
  };
  
  $scope.logout = function () {
    $auth.logout()
  };

  $scope.register = function() {
    var user = {
      username: $scope.username,
      email: $scope.email,
      password: $scope.password
    };

    $auth.signup(user)
      .then(function(response) {
        console.log(response);
        $auth.setToken(response.data.token);
        console.log($auth.getPayload())
        // Redirect user here to login page or perhaps some other intermediate page
        // that requires email address verification before any other part of the site
        // can be accessed.
      })
      .catch(function(response) {
        // Handle errors here.
      });

        // console.log(angular.fromJson(window.localStorage['user']))
        // TO DO: how to stop the server from sending back plain text password
        // $state.go('finder');
  };
}]);
