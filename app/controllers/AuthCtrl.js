"use strict";
app.controller("AuthCtrl", function ($scope, $window, AuthFactory, $location, DataFactory, $routeParams) {

let user= AuthFactory.getUser();
  $scope.account = {
    fullName: "",
    photo: "",
    city: "",
    state: "",
    instrument: "",
    style: "",
    gigs: "",
    email: "",
    password: ""
  };
//change below with $window.location also, remove scope from logout
//$logout has no scope applied since it is only called internally
let logout = () => {
    AuthFactory.logoutUser()
      .then(function (data) {
        //location is a service within angular
        $location.path("/login");
        $scope.$apply();
      }, function (error) {
      });
  };

  //when first loaded, make sure no one is logged in
  // if (AuthFactory.isAuthenticated()) {
  //   logout();
  // }


  $scope.register = (registerUser, userInfo) => {
    $scope.account= registerUser;
    AuthFactory.createUser($scope.account)
      .then((userData) => {
        console.log("user data is", userData);
        userInfo.uid= userData.uid;
        userInfo.email= userData.email;
        $location.path("/users");
        DataFactory.newProfile(userInfo)
        .then((event)=>{
          logMeIn($scope.account);
        });
      }, (error) => {
      });
  };


let logMeIn = function(loginStuff){
  AuthFactory.authenticate(loginStuff)
  .then(function(didLogin){
      $scope.login = {};
      $scope.register = {};
      $location.path("/users");
      console.log(didLogin, "didLogin");
      DataFactory.getProfile(didLogin)
      .then(data=>{
        $scope.$apply();
      });
      
    });
};
  $scope.login = () => {
    AuthFactory
      .loginUser($scope.account)
      .then(() => {
        // $scope.isLoggedIn = true;
        // $scope.$apply();
        $window.location.href = "#!/users";
      });
  };


  $scope.loginUser = function(loginNewUser){
    logMeIn(loginNewUser);
  };


  $scope.loginGoogle = () => {
    AuthFactory.authWithProvider()
      .then(function (result) {
        var user = result.user.uid;
        //Once logged in, go to another view
        $location.path("/users");
        console.log("result user", result.user);
        DataFactory.getProfile(result.user);
          $scope.$apply();        
      }).catch(function (error) {
        // Handle the Errors.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };
});

