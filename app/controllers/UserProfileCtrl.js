"use strict";
app.controller("UserProfileCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams){

    let user = $routeParams.userId;
    let proName= $routeParams.userName;
    console.log("routeParams", proName);
    let Youser= AuthFactory.getUser();
    $scope.friend= false;
    let date= new Date();
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

    // let y=[];
    // let newObj

    // DataFactory.getProfile(user)
    // .then((event)=>{
    //     $scope.user= event.data;
    //     console.log("scope user", $scope.user);
    //       for(newObj in $scope.user.friends){
    //         console.log("newObj", newObj);
    //         DataFactory.getBands(newObj)
    //             .then((data)=>{
    //                 console.log("what is data?", data);
    //                 for(let chon in data.data){
    //                     console.log("chon is",chon);
    //                      if(data.data.uid !== Youser){
    //                     y.push(data.data);
    //                 }
                   
    //             }
                
    //            // console.log("x is", x);
    //             //$scope.friends= x;
    //         });
    //     }
    // }); 

    let name;
    DataFactory.getProfile(Youser)
    .then(data=>{
        console.log("data user profile", data.data);
        name= data.data.name;
    });

     DataFactory.getStatus(user)
        .then((event)=>{
            console.log("hi", event);
            $scope.updates= event;
            //$location.url('/profile');
    });


$scope.addMessage= (text) =>{
    let index=  (new Date()).valueOf();
        $scope.messages={
            text: text,
            uid: Youser,
            date: (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
            timeStamp: date.toLocaleString(),
            ranNum: index,
            name: name
        };
    DataFactory.yourMessage(user, $scope.messages)
    .then((event)=>{

        DataFactory.getMessages(user)
        .then((event)=>{
            console.log("hi", event);
            $scope.messages= event;
            $location.url(`/users/${proName}/${user}/profile`);
        });
    });
};
   

    DataFactory.getMessages(user)
        .then((event)=>{
            console.log("hi", event);
            $scope.messages= event;
            $location.url(`/users/${proName}/${user}/profile`);
    });
     
});

