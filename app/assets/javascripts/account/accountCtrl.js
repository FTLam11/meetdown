var account = angular.module('meetdown')

account.controller('AccountCtrl', ['$scope', '$state', '$auth', 'ValidEmail', function($scope, $state, $auth, ValidEmail) {
  $scope.errors = "";

  $scope.authenticate = function(provider) {
    $auth.authenticate(provider).then(function(response) {
      if (response.data.token) {
        $auth.setToken(response.data.token);
        $state.go('root.profile');
      } else {
        $scope.errors = "Something went wrong. Please try again later.";
      };
    });
  };

  $scope.login = function() {
    var user = {
      email: $scope.emailLogin,
      password: $scope.passwordLogin
    };

    $scope.errors = "";

    if (ValidEmail(user.email)) {
      $auth.login(user)
        .then(function(response) {
          if (response.data.token) {
            $auth.setToken(response.data.token);
            $state.go('root.finder');
          } else {
            $scope.errors = response.data.error;
            $scope.emailLogin = "";
            $scope.passwordLogin = "";
          };
        });
    } else {
      $scope.errors = "Please input a valid email.";
    };
  };
  
  $scope.logout = function() {
    $auth.logout();
    $state.go('root.account');
  };

  $scope.register = function() {
    var user = {
      username: $scope.username,
      email: $scope.email,
      password: $scope.password
    };

    if (ValidEmail(user.email)) {
      $auth.signup(user)
        .then(function(response) {
          if (response.data.token) {
            $auth.setToken(response.data.token);
            $state.go('root.finder');
          } else {
            $scope.errors = response.data.error[0];
            $scope.username = "";
            $scope.email = "";
            $scope.password = "";
          };
        });
    } else {
      $scope.errors = "Please input a valid email.";
    };
  };
}]);
