"use strict";
app.controller("UserProfileCtrl", function($scope, AuthFactory, $window, $location, DataFactory, $routeParams, $uibModal, $uibModalStack, $firebaseArray, $timeout){

    let user = $routeParams.userId;
    console.log("user", user);
    let proName= $routeParams.userName;
    console.log("routeParams", proName);
    let Youser= AuthFactory.getUser();
    let date= new Date();
    $scope.friend= false;
    //console.log("Youser is", Youser);
firebase.database().ref("/profiles/" + user).on("value",function(stuff){
        console.log("what is stuff", stuff.val());
        $scope.uid = stuff.val().uid;
        $scope.photo = stuff.val().photo;
        $scope.name= stuff.val().name;
        $scope.gigs= stuff.val().gigs;
        $scope.style= stuff.val().style;
        $scope.instrument= stuff.val().instrument;
        $scope.city= stuff.val().city;
        $scope.state= stuff.val().state;

        try{
        $scope.updates= [];
        let updateColl = stuff.val().status;
        console.log("updateColl", updateColl);
        Object.keys(updateColl).forEach((key)=>{
          updateColl[key].id= key;
          $scope.updates.push(updateColl[key]);
      });  
    }
    catch(error){
        console.log("your try for status has failed");
    }

    try{
        $scope.messages= [];
        let userColl = stuff.val().message;
        console.log("userColl", userColl);
        Object.keys(userColl).forEach((key)=>{
          userColl[key].id= key;
          $scope.messages.push(userColl[key]);
         
      });
    }
    catch(error){

      console.log("your try for messages has failed");   
    }
    $scope.$apply();
});
$scope.open = function (size, parentSelector) {
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    $scope.modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
};



$scope.openRemove = function (size, parentSelector) {
    var parentElem = parentSelector ? 
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    $scope.modalInstance = $uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'removeFriend.html',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
};
  

    $scope.cancel = function () {
      $uibModalStack.dismissAll('close');
    };

    //CHECK TO SEE IF YOU HAVE ADDED AS FRIENDS OR NOT
    DataFactory.getYourProfile(Youser)
    .then(data=>{
        let friends= data.data.friends;
        for(let f in friends){
            if(friends[f] === user){
                
                $scope.friend= true;
                $scope.$apply();
                $timeout();
            } else{
                $scope.friend= false;
            }
        }
    });

    $scope.addFriend = (id) => {
        console.log("what is id", id);
        DataFactory.addFriend(Youser, id)
        .then( response => {
            console.log("yeah add");
            $scope.friend= true;
            // $scope.$apply();
            
        }).catch( error => {
            console.log(error, "error");
        });
    };
    $scope.removeFriend = id => {
        DataFactory.removeFriend(Youser, id)
        .then( response => {
            console.log("yeah remove");
            $scope.friend= false;
            // $scope.$apply();
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

    DataFactory.getYourProfile(user)
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



    let name;
    DataFactory.getYourProfile(Youser)
    .then(data=>{
        name= data.data.name;
    });


// $scope.addMessage= (text) =>{
//     let index=  (new Date()).valueOf();
//         $scope.messages={
//             text: text,
//             uid: Youser,
//             date: (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
//             timeStamp: date.toLocaleString(),
//             ranNum: index,
//             name: name
//         };
//     DataFactory.yourMessage(user, $scope.messages)
//     .then((event)=>{

//         DataFactory.getMessages(user)
//         .then((event)=>{
//             console.log("hi", event);
//             $scope.messages= event;
//             $location.url(`/users/${proName}/${user}/profile`);
//         });
//     });
// };


//BEGIN GET PIC FOR MESSAGES
let pic;
DataFactory.getYourProfile(Youser)
.then(data=>{
    pic= data.data.photo;
    console.log("pic", pic);
});
//END GETTING PIC

$scope.addMessage= (text) =>{
    let index=  (new Date()).valueOf();
        $scope.messages={
            text: text,
            uid: Youser,
            date: (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear(),
            timeStamp: date.toLocaleString(),
            ranNum: index,
            name: name,
            pic: pic
        };
    firebase.database().ref("profiles/" + user+"/message/"+ $scope.messages.ranNum).set($scope.messages);
    $scope.message= "";
}; 

    // DataFactory.getMessages(user)
    //     .then((event)=>{
    //         console.log("hi", event);
    //         $scope.messages= event;
    //         $location.url(`/users/${proName}/${user}/profile`);
    // });



     
});

