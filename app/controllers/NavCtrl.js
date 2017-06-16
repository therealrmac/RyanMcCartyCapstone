"use strict";

app.controller('NavCtrl', function ($scope, AuthFactory, $window, SearchTermData, DataFactory) {
  let you= AuthFactory.getUser();
  $scope.userId;
  console.log("user id in nav is", $scope.userId);

  $scope.isLoggedIn = false;
  $scope.searchText = SearchTermData;

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
