"use strict";
app.controller("UserProfileCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams){

    let user = $routeParams.userId;
    $scope.friend= false;
    //console.log("User name is", user.name);
    let Youser= AuthFactory.getUser();
    //console.log("Youser is", Youser);
    $scope.friendName = $routeParams.friendName;
    $scope.friendInfo= {
        name: user.name,
        photo: user.photo
    };
    console.log("what is scope friendInfo", $scope.friendInfo);
    DataFactory.getProfile( user)
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
    $scope.addFriend = (id) => {
        console.log("what is id", id);
        DataFactory.addFriend(Youser, id)
        .then( response => {
            console.log("yeah add");
            $scope.friend= false;
            console.log("what is scope friend", $scope.friend);
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
            console.log("what is scope friend", $scope.friend);
            $scope.apply();
        }).catch( error => {
            console.log(error, "error");
        });
    };
    DataFactory.getBands(user)
    .then((bands)=>{
        console.log("bands is", bands);
        $scope.yourBands= bands;
    });

});

