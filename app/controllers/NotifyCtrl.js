"use strict";
app.controller("NotifyCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams, $firebaseArray){

    let Yuser= AuthFactory.getUser();
    let user= $routeParams.profileId;
    let notifyRef= firebase.database().ref('notificatioins/'+ Yuser);
    $scope.myProfile= false;

    if(Yuser === user){
        $scope.myProfile= true;
        $scope.notificatioins= $firebaseArray(notifyRef);
    }


});
