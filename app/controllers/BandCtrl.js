"use strict";
app.controller("BandCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams){
let user= AuthFactory.getUser();
console.log("and user is", user);
let paramUser= $routeParams.bandName;
console.log("param user is", $routeParams.bandName);
let x=[];
    DataFactory.getBand(user, paramUser)
    .then((data)=>{
        console.log("data in BandCtrl is", data.members);
        $scope.band= data;
        $scope.people= data.members;
        console.log("scope band is", $scope.people);
    });



});
