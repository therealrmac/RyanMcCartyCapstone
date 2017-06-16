"use strict";
app.controller("ProfileCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams){

    let Youser= AuthFactory.getUser();
    let userId = $routeParams.userId;
    let date= new Date();

    // Connection Request
    $scope.AreWeConnected = false;
    $scope.connect_button_clicked = false;
    $scope.respondConnReq = false;
    $scope.connectReqText = 'Request Connection';
    $scope.respondConnReqText = 'Respond to Request';


    // Relationship Request
    $scope.InRelationship = false;
    $scope.respondRelReq = false;
    $scope.relationship_button_clicked = false;
    $scope.hideRelationshipButton = false;
    $scope.thisUserInRelationship = false;
    $scope.loggedInUserInRelationship = false;
    $scope.relationshipReqText = 'Request Relationship';
    $scope.respondRelReqText = 'Confirm Relationship';

    $scope.myProfile = false;




    if(Youser === userId){
        $scope.myProfile= true;
    }

    $scope.yourName = $routeParams.yourName;

    DataFactory.getProfile( Youser)
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
    DataFactory.getBands(Youser)
    .then((bands)=>{
        $scope.yourBands= bands;
    });

    let x= [];
    let obj;

    DataFactory.getProfile(Youser)
    .then((event)=>{
        $scope.user= event.data;
          for(obj in $scope.user.friends){
        DataFactory.getFriends(obj)
        .then((data)=>{
            x.push(data.data);
            $scope.friends= x;
        });
        }
    });




$scope.updateStatus= (text) =>{
        $scope.status={
            text: text,
            uid: Youser,
            date: (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
            timeStamp: date.toLocaleString(),
            ranNum: Math.floor(Math.random()*100000+1)
        };
console.log("status scope", $scope.status);
    console.log('text', text);
    DataFactory.yourStatus(Youser, $scope.status)
    .then((event)=>{
        console.log("event", event);
    });
};

    DataFactory.getStatus(Youser)
    .then((event)=>{
        console.log("hi", event);
        $scope.updates= event;
    });


});
