"use strict";
app.controller("BandForm", function($scope, AuthFactory, $window, $location, DataFactory){
    let user= AuthFactory.getUser();
    let x= [];
     let obj;

    DataFactory.getProfile(user)
    .then((event)=>{
        $scope.user= event.data;
        console.log("scope user is", $scope.user);
          for(obj in $scope.user.friends){
        DataFactory.getFriends(obj)
        .then((data)=>{
            console.log("data is", data);
            x.push(data.data);
            console.log("x is", x);
            $scope.friends= x;
        });
        }
    });

    
     $scope.band = {
        name: "",
        info: "",
        uid: user,
        members: ""
     };

   
   


    $scope.makeBand = (id) => {
        DataFactory.makeBand($scope.user.uid, $scope.band)
        .then( response => {
            $location.url("/profile");
        }).catch( error => {
            console.log(error, "error");
        });
    };

    // DataFactory.getFriends()


});
