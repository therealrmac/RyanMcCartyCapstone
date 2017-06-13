"use strict";
app.factory("DataFactory", function($q, $http, fbcreds) {

    const addFriend = (user, friend) => {
        let obj = JSON.stringify(" ");
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

    const newProfile = (data) => {
        console.log('data is', data);
        let friends = ["none"];
        let profile = {
            uid: data.uid,
            photo: data.photo,
            email: data.email,
            name: data.name,
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
        console.log("data on line 49 of DataFactory is", data);
        return $q((resolve, reject) => {
            $http.get(`${fbcreds.databaseURL}/profiles/${data.uid}.json`)
            .then((response) => {
                console.log(response);
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


    return{addFriend, removeFriend, newProfile, editProfile, getProfile, getUsers, getProfiles};

});
