"use strict";
app.controller("EditBandCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams){
    let user= AuthFactory.getUser();
     $routeParams.userId = user;
    let band= $routeParams.ranNum;
        
    console.log("band name is", $scope.band);
      console.log("user", user);
    let x= [];
    let obj;

    DataFactory.getBand(user,band)
    .then((data)=>{
        console.log("data from edit band is", data);
        $scope.band= data;
    });

    DataFactory.getYourProfile(user)
    .then((event)=>{
        $scope.user= event.data;
          for(obj in $scope.user.friends){
        DataFactory.getFriends(obj)
        .then((data)=>{
            x.push(data.data);
            //console.log("x is", x);
            $scope.friends= x;
        });
        }
    });



      $scope.editBand = () => {
        
        console.log("$scope profile is", $scope.band);
        DataFactory.editBand(user, $scope.band)
            .then( () => {
                $location.url("/profile");
        });
    };



});
