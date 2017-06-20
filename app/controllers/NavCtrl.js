"use strict";

app.controller('NavCtrl', function ($scope, AuthFactory, $window, SearchTermData, DataFactory, $location) {
  let you= AuthFactory.getUser();
  console.log("current user is", you);


  $scope.isLoggedIn = false;
  $scope.searchText = SearchTermData;
  $scope.logout = () => {
    AuthFactory.logoutUser()
      .then(function (data) {
        //location is a service within angular
        $location.path("/login");
        $scope.$apply();
      }, function (error) {
      });
  };



  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      $scope.isLoggedIn = true;
      console.log("currentUser logged in", user, $scope.isLoggedIn);
      $scope.$apply();
    } else {
      $scope.isLoggedIn = false;
      //console.log("currentUser logged in", $scope.isLoggedIn);
      $window.location.href = "#!/login";
    }
  });

});
