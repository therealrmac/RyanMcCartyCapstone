"use strict";
app.controller("UsersCtrl", function($scope, AuthFactory, $window, $location, DataFactory, SearchTermData){
    $scope.searchText = SearchTermData;
    let user= AuthFactory.getUser();
    console.log("user ", user);

    let populatePeople = () => {
        $scope.friendList = [];
        $scope.nonFriends = [];
        DataFactory.getProfiles()
        .then((data) => {
            for(let people in data) {
                    if(people !== user) {
                        $scope.nonFriends.push(data[people]);
                        
                    }
                    //console.log("scope nonFriends uid");
                    //console.log("people data", people.uid);
            }
        });
    };




 populatePeople();
});
