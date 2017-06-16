"use strict";
app.controller("UserProfileCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams){

    let user = $routeParams.userId;
    $scope.friend= false;
    //console.log("User name is", user.name);
    let Youser= AuthFactory.getUser();
    //console.log("Youser is", Youser);
    DataFactory.getProfile( user)
    .then( stuff => {
        $scope.uid = stuff.data.uid;
        $scope.photo = stuff.data.photo;
        $scope.name= stuff.data.name;
        $scope.gigs= stuff.data.gigs;
        $scope.style= stuff.data.style;
        $scope.instrument= stuff.data.instrument;
        $scope.city= stuff.data.city;
        $scope.state= stuff.data.state;
    });
    $scope.addFriend = (id) => {
        console.log("what is id", id);
        DataFactory.addFriend(Youser, id)
        .then( response => {
            console.log("yeah add");
            $scope.friend= false;
            $scope.apply();
        }).catch( error => {
            console.log(error, "error");
        });
    };
    $scope.removeFriend = id => {
        DataFactory.removeFriend(Youser, id)
        .then( response => {
            console.log("yeah remove");
            $scope.friend= true;
            $scope.apply();
        }).catch( error => {
            console.log(error, "error");
        });
    };
    DataFactory.getBands(user)
    .then((bands)=>{
        $scope.yourBands= bands;
    });

    let x= [];
    let obj;

    DataFactory.getProfile(user)
    .then((event)=>{
        $scope.user= event.data;
          for(obj in $scope.user.friends){
            //console.log("obj", obj);
        DataFactory.getFriends(obj)
            .then((data)=>{
                if(data.data.uid !== Youser){
                    x.push(data.data);
                }
                
               // console.log("x is", x);
                $scope.friends= x;
            });
        }
    }); 

     
});

