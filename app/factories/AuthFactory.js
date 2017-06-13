"use strict";

app.factory("AuthFactory", function(){

    //currentUser, createUser, loginUser, logoutUser, isAuthenticated getUser

    let currentUser = null,
        userPhoto = "",
        userDisplayName = "";

    let createUser = function(userObj){
        console.log("userObj is", userObj);
        return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
        .catch( function(error){
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error:", errorCode, errorMessage);
        });
    };

    let loginUser = function(userObj) {
        return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
        .catch( function(error){
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log("error:", errorCode, errorMessage);
        });
    };
  let authenticate = (credentials) => {
    return firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password);
  };

    let logoutUser = function(){
        return firebase.auth().signOut();
    };


    let isAuthenticated = function (){
        return new Promise ( (resolve, reject) => {
            firebase.auth().onAuthStateChanged( (user) => {
                if (user){
                    userPhoto = user.photoURL;
                    currentUser = user.uid;
                    userDisplayName = user.displayName;
                    resolve(true);
                }else {
                    resolve(false);
                }
            });
        });
    };

    let getUser = function(){
        return currentUser;
    };

    let getUserPhoto = () => {
        return userPhoto;
    };

    let getUserDisplayName = () => {
        return userDisplayName;
    };

    let provider = new firebase.auth.GoogleAuthProvider();

    let authWithProvider= function(){
        return firebase.auth().signInWithPopup(provider);
    };



    return {createUser, loginUser, logoutUser, isAuthenticated, getUser, authWithProvider, getUserPhoto, getUserDisplayName, authenticate};


});
