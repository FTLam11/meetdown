var profile = angular.module('meetdown');

profile.controller('ProfileCtrl', ['$scope', '$stateParams', '$window', 'User', 'GetUserTopics', '$location', '$auth', 'UserEventList','SubmitSurvey', 'Authenticate', 'RequestSignature', 'UploadToS3', 'DataURItoBlob', function($scope, $stateParams, $window, User, GetUserTopics, $location, $auth,UserEventList,SubmitSurvey, Authenticate, RequestSignature, UploadToS3, DataURItoBlob) {
Authenticate();
setProfile();
$scope.homeProfile=false
$scope.editing=false
$scope.editingPic = false;

$scope.edit= function(){
  $scope.editing=true
}

$scope.editPic = function() {
  $scope.editingPic = true;
};

$scope.profilePic = "";
$scope.croppedProfilePic = "";

var fileManager = function(event) {
  var file = event.currentTarget.files[0];
  var reader = new FileReader();
  reader.onload = function(event) {
    $scope.$apply(function($scope) {
      $scope.profilePic = event.target.result;
    });
  };
  reader.readAsDataURL(file);
};

angular.element(document.querySelector('#fileInput')).on('change', fileManager);

$scope.updateProfilePic = function() {
  RequestSignature.save({token: $auth.getToken(), key: $scope.file.name, user: $auth.getPayload()}).$promise.then(function(response) {
    UploadToS3.upload({key: response.key, AWSAccessKeyId: response.AWSAccessKeyId, acl: "public-read", policy: response.policy, signature: response.signature, 'Content-Type': 'image/jpeg', file: $scope.croppedProfilePicBlob}).$promise.then(function(s3Response) {
      SubmitSurvey.update({id: $auth.getPayload().id, picture: "https://s3.amazonaws.com/media.meetdown.info/" + s3Response.key, token: $auth.getToken()}).$promise.then(function(response){
        $auth.setToken(response.token);
        $scope.showProfile($auth.getPayload()['id']);
      })
    });
  });

$scope.croppedProfilePicBlob = DataURItoBlob($scope.croppedProfilePic);
};

$scope.showProfile = function(profileID) {
  $location.path("/profile/" + profileID)
};

$scope.cancel= function(){
  $scope.editing=false
  $scope.editingPic = false;
}

$scope.saveChanges= function(){
  SubmitSurvey.update({email:$scope.tempEmail, age: $scope.tempAge, zip_code: $scope.tempZip, id: $auth.getPayload().id, token: $auth.getToken()}).$promise.then(function(response){
      $auth.setToken(response.token);
      setProfile(); //call with no argument to go to /profile
      $scope.editing=false
    })
}

function showEvents(){
  UserEventList.get({id: $scope.user.id}).$promise.then(function(data) {
    $scope.hostings = data.hostings
    $scope.attendings = data.attendings
    $scope.homeProfile = ($auth.getPayload().id === $scope.user.id)
  })
}

function setProfile(){
  if ($stateParams.id) {
    User.get({user_id: $stateParams.id}).$promise.then(function(data) {
      $scope.user = data.user;
      $scope.userTopics = data.topics
      $scope.hostings = data.hostings
      $scope.attendings = data.attendings
      $scope.homeProfile = ($auth.getPayload().id === $scope.user.id)
      showEvents();
    }); 
  } 
  else {
     User.get({user_id: $auth.getPayload().id}).$promise.then(function(data) {
      $scope.user = data.user;
      $scope.userTopics = data.topics
      $scope.hostings = data.hostings
      $scope.attendings = data.attendings
      $scope.homeProfile = ($auth.getPayload().id === $scope.user.id)
      showEvents();
    }); 
  }
}

$scope.showTopic = function(topic) {
  $location.path("/topics/"+topic.id);
}

}]);