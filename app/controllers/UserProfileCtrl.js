"use strict";
app.controller("UserProfileCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams){

    let user = $routeParams.userId;
    console.log("User is", user);
    let Youser= AuthFactory.getUser();
    //console.log("Youser is", Youser);
    $scope.friendName = $routeParams.friendName;

    DataFactory.getProfile({uid: user})
    .then( stuff => {
        console.log("data", stuff.data);
        $scope.uid = stuff.data.uid;
        $scope.photo = stuff.data.photo;
        $scope.name= stuff.data.name;
    });

});

