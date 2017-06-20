"use strict";
app.factory("DataFactory", function($q, $http, fbcreds) {
    let fbNotification= firebase.database().ref('notifications');
    console.log("fb notifications", fbNotification);

    const addFriend = (user, friend) => {
        console.log("the friend is", friend);
        let obj = JSON.stringify(friend);
        return $q((resolve, reject) => {
            $http.put(`${fbcreds.databaseURL}/profiles/${user}/friends/${friend}.json`, obj)
            .then( resolve )
            .catch( reject );
        });
    };

    const removeFriend = (user, enemy) => {
        return $q((resolve, reject) => {
            $http.delete(`${fbcreds.databaseURL}/profiles/${user}/friends/${enemy}.json`)
            .then( resolve )
            .catch( reject );
        });
    };
    const makeBand= (user,band)=>{
        console.log("what is band", band);
        console.log("and user is", user);
        let obj= JSON.stringify(band);
        return $q((resolve,reject)=>{
            $http.put(`${fbcreds.databaseURL}/profiles/${user}/bands/${band.ranNum}.json`, obj)
            .then(resolve)
            .catch(reject);
        });
    };

    const getBands= (user)=>{
        console.log("get bands user", user);
        return $q((resolve,reject)=>{
            $http.get(`${fbcreds.databaseURL}/profiles/${user}/bands.json`)
            .then((bandObj)=>{
              let bands= [];
              let bandColl= bandObj.data;
              Object.keys(bandColl).forEach((key)=>{
                bandColl[key].id= key;
                bands.push(bandColl[key]);
              });
              resolve(bands);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };
const getFriends= (userId)=>{
 return $q((resolve,reject)=>{
            $http.get(`${fbcreds.databaseURL}/profiles/${userId}.json`)
            .then((friendObj)=>{
              // let bands= [];
              // let bandColl= bandObj.data;
              // Object.keys(bandColl).forEach((key)=>{
              //   bandColl[key].id= key;
              //   bands.push(bandColl[key]);
              // });
              resolve(friendObj);
            })
            .catch((error)=>{
                reject(error);
            });
        });
    };
    const newProfile = (data) => {
        console.log('data on newProfile is', data);
        let friends = ["none"];
        let profile = {
            uid: data.uid,
            photo: data.photoURL,
            email: data.email,
            name: data.displayName,
            instrument: data.instrument,
            city: data.city,
            state: data.state,
            gigs: data.gigs,
            style: data.style
        };
        let obj = JSON.stringify(profile);
        return $q((resolve, reject) => {
            $http.put(`${fbcreds.databaseURL}/profiles/${data.uid}.json`, obj)
            .then((response) => {})
            .catch((error) => {});
        });
    };

    const editProfile = (uid, obj) => {
        return $q( (resolve, reject) => {
            let newObj = JSON.stringify(obj);
            $http.patch(`${fbcreds.databaseURL}/profiles/${uid}.json`, newObj)
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };
    const getProfile = (data) => {
        console.log("data on getProfile", data);
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/profiles/${data.uid}.json`)
            .then((response) => {
                console.log("get profile response rd",response.data);
                if(response.data === null) {
                    newProfile(data);
                } else {
                    console.log("already in our base");
                }
                resolve(response);
            }).catch((error) => {
                console.log(error, "error");
            });
        });
    };

    const getYourProfile = (data) => {
        console.log("data on getProfile", data);
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/profiles/${data}.json`)
            .then((response) => {
                console.log("the response is",response);
                resolve(response);
            }).catch((error) => {
                console.log(error, "error");
            });
        });
    };


  const getUsers = () => {
    let users= [];
    return $q( (resolve, reject) => {
      $http.get(`${fbcreds.databaseURL}/users.json`)
      .then( (userObj) => {
        let userColl = userObj.data;
        Object.keys(userColl).forEach((key)=>{
          userColl[key].id= key;
          users.push(userColl[key]);
        });
        resolve(users);
      })
      .catch( (error) => {
        reject(error);
      });
    });
  };

const getProfiles = () => {
    return $q((resolve, reject) => {
        $http.get(`${fbcreds.databaseURL}/profiles.json`)
        .then((response) => {
            resolve(response.data);
        }).catch((error) => {
            console.log(error);
        });
    });
};

const getBand= (userId,bandName) =>{
    console.log("userId is", userId);
    console.log("bandName is", bandName);
    return $q((resolve,reject)=>{
        $http.get(`${fbcreds.databaseURL}/profiles/${userId}/bands/${bandName}.json`)
        .then((bandObj)=>{
            let band= bandObj.data;
            resolve(band);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};

let yourRequest= (database, user, userId)=>{
    return $q(resolve =>{
        database.child(user).child(userId).once('value')
        .then((x)=>{
            if(user !== userId){
                if(x.exists()){
                    resolve(true);
                } else{
                    resolve(false);
                }
            }
        });
    });
};


let userRequest=(database, user, userId)=>{
    return $q(resolve =>{
        database.child(userId).child(user).once('value')
        .then((x)=>{
            if(x.exists()){
                resolve(true);
            } else {
                resolve(false);
            }
        });
    });
};

let sendRequest=(userId, yourId, text)=>{
    let obj= {
        userid: userId,
        yourid: yourId,
        message: text
    };
    let x= fbNotification.child(userId);
    x.push(obj);
};

let yourStatus=(yourId, text)=>{
    console.log("yourId", yourId);
    console.log("text", text);
    return $q((resolve,reject)=>{
        let obj= JSON.stringify(text);
        $http.put(`${fbcreds.databaseURL}/profiles/${yourId}/status/${text.ranNum}.json`,obj)
        .then(event=>{
            resolve(event);
        })
        .catch(error=>{
            reject(error);
        });
    });
};
let yourMessage=(yourId, text)=>{
    console.log("yourId", yourId);
    console.log("text", text);
    return $q((resolve,reject)=>{
        let obj= JSON.stringify(text);
        $http.put(`${fbcreds.databaseURL}/profiles/${yourId}/message/${text.ranNum}.json`,obj)
        .then(event=>{
            resolve(event);
        })
        .catch(error=>{
            reject(error);
        });
    });
};

//get all status's
let getStatus=(yourId)=>{
    console.log("yourId", yourId);
    let x=[];
    return $q((resolve,reject)=>{
        $http.get(`${fbcreds.databaseURL}/profiles/${yourId}/status.json`)
      .then( (userObj) => {
        let userColl = userObj.data;
        Object.keys(userColl).forEach((key)=>{
          userColl[key].id= key;
          x.push(userColl[key]);
        });
        resolve(x);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};

let getMessages=(yourId)=>{
    console.log("yourId", yourId);
    let x=[];
    return $q((resolve,reject)=>{
        $http.get(`${fbcreds.databaseURL}/profiles/${yourId}/message.json`)
      .then( (userObj) => {
        let userColl = userObj.data;
        Object.keys(userColl).forEach((key)=>{
          userColl[key].id= key;
          x.push(userColl[key]);
        });
        resolve(x);
        })
        .catch((error)=>{
            reject(error);
        });
    });
};

let removeStatus=(yourId,data)=>{
    return $q((resolve,reject)=>{
        $http.delete(`${fbcreds.databaseURL}/profiles/${yourId}/status/${data.ranNum}.json`)
        .then((x)=>{
            resolve(x);
        })
        .catch(error=>{
            reject(error);
        });
    });
};
let removeMessage=(yourId,data)=>{
    console.log("data on remove message is", data);
    console.log("your id is", yourId);
    return $q((resolve,reject)=>{
        $http.delete(`${fbcreds.databaseURL}/profiles/${yourId}/message/${data.ranNum}.json`)
        .then((x)=>{
            resolve(x);
        })
        .catch(error=>{
            reject(error);
        });
    });
};

let editBand = (uid, obj) => {
    console.log("uid is", uid);
    console.log("obj is", obj.name);
        return $q( (resolve, reject) => {
            let newObj = JSON.stringify(obj);
            $http.patch(`${fbcreds.databaseURL}/profiles/${uid}/bands/${obj.ranNum}.json`, newObj)
            .then((response) => {
                resolve(response);
            }).catch((error) => {
                reject(error);
            });
        });
    };

let removeBand= (uid, obj)=>{
    console.log("uid is", uid);
    console.log("obj is", obj);
    return $q((resolve,reject)=>{
        $http.delete(`${fbcreds.databaseURL}/profiles/${uid}/bands/${obj}.json`)
        .then(data=>{
            resolve(data);
        })
        .catch(error=>{
            reject(error);
        });
    });
};

    return{addFriend, removeFriend, newProfile, editProfile, getProfile, getUsers, getProfiles, makeBand, getBands, getFriends, getBand, yourRequest, userRequest, sendRequest, yourStatus, getStatus, yourMessage, getMessages, removeStatus, removeMessage, editBand, removeBand, getYourProfile};

});
