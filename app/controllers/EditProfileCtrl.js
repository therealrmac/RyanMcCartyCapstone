"use strict";
app.controller("EditProfileCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams){


  let user = AuthFactory.getUser();
  
  $routeParams.userId = user;
  console.log("user", user);

  DataFactory.getProfile( user)
  .then( stuff => {
    $scope.profile = stuff.data;
  });

  $scope.editProfile = () => {
    
    console.log("$scope profile is", $scope.profile);
    DataFactory.editProfile(user, $scope.profile)
    .then( () => {
        $location.url("/profile");
    });
  };

});
