"use strict";
app.controller("UserBandCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams){
let bandId= $routeParams.bandId;
console.log("and user is", bandId);
let paramUser= $routeParams.bandName;
console.log("param user is", $routeParams.bandName);
let x=[];

    DataFactory.getBand(bandId, paramUser)
    .then((data)=>{
        console.log("data in UserBandCtrl is", data);
        $scope.band= data;
        console.log("scope band is", $scope.band);

    });



});
