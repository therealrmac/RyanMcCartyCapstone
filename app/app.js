"use strict";

const app= angular.module("LetsJam", ["ngRoute"]);

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
    .when("/user/:userName/:userId/profile",{
        templateUrl: "partials/UserProfile.html",
        controller: "UserProfileCtrl",
        resolve: {isAuth}
    })
    .when("/user/viewBand/:bandName/:bandId",{
        templateUrl: "partials/userBands.html",
        controller: "UserBandCtrl",
        resolve: {isAuth}
    })
    .when("/profile",{
        templateUrl: "partials/profile.html",
        controller: "ProfileCtrl",
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
    .when("/profile/viewBand/:bandName",{
        templateUrl: "partials/yourBands.html",
        controller: "BandCtrl",
        resolve: {isAuth}
    })
    .when("/:bandId/editBand",{
        templateUrl: "partials/editBand.html",
        controller: "EditBandCtrl",
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
