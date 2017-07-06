"use strict";
app.controller("RecUsersCtrl", function($scope, AuthFactory, $window, $location, DataFactory, SearchTermData){
    $scope.searchText = SearchTermData;
    let user= AuthFactory.getUser();
    console.log("user ", user);
    let usercity;
    
      DataFactory.getYourProfile(user)
      .then((event)=>{
        usercity= event.data.city;
        console.log("user city", usercity);
      });



    let populatePeople = () => {
        $scope.nonFriends = [];
        DataFactory.getProfiles()
        .then((data) => {
          console.log("data for populatePeople", data);
            for(let city in data) {
              console.log("what is people", data[city].city);
                    if(data[city].city === usercity) {
                        $scope.nonFriends.push(data[city]);
                        
                    }
                    //console.log("scope nonFriends uid");
                    //console.log("people data", people.uid);
            }
        });
    };

  $scope.isLoggedIn = false;
  $scope.searchText = SearchTermData;
  $scope.logout = () => {
    AuthFactory.logoutUser()
      .then(function (data) {
        //location is a service within angular
        $location.path("/login");
        $scope.$apply();
      }, function (error) {
      });
  };


 populatePeople();
});
