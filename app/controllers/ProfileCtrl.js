"use strict";
app.controller("ProfileCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams){

    let Youser= AuthFactory.getUser();
    console.log("current user is", Youser);
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

//GET CURRENT USERS PROFILE 
    DataFactory.getYourProfile( Youser)
    .then( stuff => {
        console.log("what is stuff", stuff.data);
        $scope.uid = stuff.data.uid;
        $scope.photo = stuff.data.photo;
        $scope.name= stuff.data.name;
        $scope.gigs= stuff.data.gigs;
        $scope.style= stuff.data.style;
        $scope.instrument= stuff.data.instrument;
        $scope.city= stuff.data.city;
        $scope.state= stuff.data.state;
    });
    //GET CURRENT USERS BANDS
    DataFactory.getBands(Youser)
    .then((bands)=>{
        $scope.yourBands= bands;
    });
//END GETTING CURRENT USER PROFILE AND BANDS



//GET FRIENDS OF A CURRENT USER
    let x= [];
    let obj;

    DataFactory.getYourProfile(Youser)
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
//END GETTING FRIENDS OF CURRENT USER


//NEED A NAME TO GO ALONG WITH THE MESSAGE YOU WRIGHT
let name;
DataFactory.getYourProfile(Youser)
.then(data=>{
    name= data.data.name;
});
//END GET NAME 


//MAKE A NEW STATUS AND HAVE IT UPDATE IN REAL TIME
$scope.updateStatus= (text) =>{
    let index=  (new Date()).valueOf();
        $scope.status={
            text: text,
            uid: Youser,
            date: (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
            timeStamp: date.toLocaleString(),
            ranNum: index
        };
    DataFactory.yourStatus(Youser, $scope.status)
    .then((event)=>{

        DataFactory.getStatus(Youser)
        .then((event)=>{
            console.log("hi", event);
            $scope.updates= event;
            $location.url('/profile');
        });
    });
};
    DataFactory.getStatus(Youser)
    .then((event)=>{
        console.log("hi", event);
        $scope.updates= event;
        $location.url('/profile');
    });
//END STATUS 


//ADD MESSAGES TO YOUR PROFILE/RESPOND TO MESSAGES  
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
    DataFactory.yourMessage(Youser, $scope.messages)
    .then((event)=>{

        DataFactory.getMessages(Youser)
        .then((event)=>{
            console.log("hi", event);
            $scope.messages= event;
            $location.url('/profile');
        });
    });
};
    DataFactory.getMessages(Youser)
    .then((event)=>{
        console.log("hi", event);
        $scope.messages= event;
        $location.url('/profile');
    });
//END MESSAGES



//REMOVE A SPECIFIC STATUS UPDATE FROM FIREBASE 
$scope.removeStatus= (text)=>{
    console.log('remove text is', text);
    DataFactory.removeStatus(Youser,text)
    .then(data=>{
        DataFactory.getStatus(Youser)
            .then((event)=>{
                console.log("hi", event);
                $scope.updates= event;
                $location.url('/profile');
   
        });
    });
};
//END STATUS REMOVAL



$scope.removeMessage= (text)=>{
    console.log('remove text is', text);
    DataFactory.removeMessage(Youser,text)
    .then(data=>{
        DataFactory.getMessages(Youser)
            .then((event)=>{
                console.log("hi", event);
                $scope.messages= event;
                $location.url('/profile');
   
        });
    });
};



});
