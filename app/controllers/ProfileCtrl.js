"use strict";
app.controller("ProfileCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams){

    let Youser= AuthFactory.getUser();
    //console.log("Youser is", Youser);
    $scope.yourName = $routeParams.yourName;

    DataFactory.getProfile( Youser)
    .then( stuff => {
        console.log("data", stuff.data);
        $scope.uid = stuff.data.uid;
        $scope.photo = stuff.data.photo;
        $scope.name= stuff.data.name;
        $scope.gigs= stuff.data.gigs;
        $scope.style= stuff.data.style;
        $scope.instrument= stuff.data.instrument;
        $scope.city= stuff.data.city;
        $scope.state= stuff.data.state;
    });
    DataFactory.getBands(Youser)
    .then((bands)=>{
        console.log("bands is", bands);
        $scope.yourBands= bands;
    });
});
