"use strict";

let app= angular.module("LetsJam", ["ngRoute", "ui.bootstrap","firebase"]);
// angular.module('myModule', ['tmjModal']);

let isAuth= (AuthFactory) => {new Promise ( (resolve,reject) =>{
    AuthFactory.isAuthenticated()
    .then((userExists)=>{
        if(userExists){
            console.log("Authenticated, go ahead");
            resolve();
        } else{
            console.log("Authentication rejected");
            reject();
            }
        });
    });
};



app.config($routeProvider=>{
    $routeProvider
    .when("/",{
        templateUrl: "partials/splash.html",
        controller: "NavCtrl"
    })
    .when("/register",{
        templateUrl: "partials/register.html",
        controller: "AuthCtrl"
    })
    .when("/login",{
        templateUrl: "partials/login.html",
        controller: "AuthCtrl"
    })
    .when("/users",{
        templateUrl: "partials/users.html",
        controller: "UsersCtrl",
        resolve: {isAuth}
    })
    .when("/users/:userName/:userId/profile",{
        templateUrl: "partials/userProfile.html",
        controller: "UserProfileCtrl",
        resolve: {isAuth}
    })
    .when("/users/:uid/viewBand/:bandName/:ranNum",{
        templateUrl: "partials/userBands.html",
        controller: "UserBandCtrl",
        resolve: {isAuth}
    })    
    .when("/profile",{
        templateUrl: "partials/profile.html",
        controller: "ProfileCtrl",
        resolve: {isAuth}
    })
    .when("/profile/viewBand/:bandName/:ranNum/edit",{
        templateUrl: "partials/editBand.html",
        controller: "EditBandCtrl",
        resolve: {isAuth}
    })
    .when("/profile/newBand",{
        templateUrl: "partials/bandForm.html",
        controller: "BandForm",
        resolve: {isAuth}
    })
    .when("/profile/edit",{
        templateUrl: "partials/editProfile.html",
        controller: "EditProfileCtrl",
        resolve: {isAuth}
    })
    .when("/profile/viewBand/:bandName/:ranNum",{
        templateUrl: "partials/yourBands.html",
        controller: "BandCtrl",
        resolve: {isAuth}
    })
    .otherwise("/");

});


app.run(($location, fbcreds)=>{
   let cred = fbcreds;
   let authConfig = {
    apiKey: cred.apiKey,
    authDomain: cred.authDomain,
    databaseURL: cred.databaseURL
   };

   firebase.initializeApp(authConfig);
});
