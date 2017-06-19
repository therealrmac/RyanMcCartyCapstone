"use strict";
app.controller("UserBandCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams){
let user= $routeParams.uid;
console.log("and user is", user);
console.log("param user is", $routeParams);
let paramUser= $routeParams.ranNum;



console.log("param user is", $routeParams);
let x=[];
    DataFactory.getBand(user, paramUser)
    .then((data)=>{
        //console.log("data in BandCtrl is", data.members);
        $scope.band= data;
        console.log("band name", $scope.band.name);
        $scope.people= data.members;
        //console.log("scope band is", $scope.people);
    });



});
