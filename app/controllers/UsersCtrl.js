"use strict";
app.controller("UsersCtrl", function($scope, AuthFactory, $window, $location, DataFactory, SearchTermData){
    $scope.searchText = SearchTermData;
    let user= AuthFactory.getUser();

    let populatePeople = () => {
        $scope.friendList = [];
        $scope.nonFriends = [];
        DataFactory.getProfiles()
        .then((data) => {
            let me = data[user];
            console.log(data, "data", me, "me");
            for(let people in data) {
                try {
                    let ding = me.friends[people];
                    if(ding == " ") {
                        $scope.friendList.push(data[people]);
                    } else {
                        $scope.nonFriends.push(data[people]);
                    }
                } catch (e) {
                    $scope.nonFriends.push(data[people]);
                }
                console.log($scope.nonFriends, "non");
            } 
        });
    };

 populatePeople();
});
