import Fire from '../../Fire';
import { AsyncStorage, Alert } from 'react-native';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT'
export const SET_FIREBASE_DATA = 'SET_FIREBASE_DATA'
export const SET_PHOTO_URL = 'SET_PHOTO_URL'
export const SET_GROUPS = 'SET_GROUPS'
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';

let timer;

export const logOut = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
};

export const authenticate = (email, userId, token, expiryTime)  => {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({type: AUTHENTICATE, email, userId: userId, token: token});
  };
};

const clearLogoutTimer = () => {
if(timer){
  clearTimeout(timer)
}
};

const setLogoutTimer = expirationTime => {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logOut());
    }, expirationTime);
  }
}




export const logInWithFacebook = () => {
  return async (dispatch, getState) => {

    await Facebook.initializeAsync('621878081710120');
    const {
      type,
      token,
      expires,
      permissions,
      declinedPermissions,
    } = await Facebook.logInWithReadPermissionsAsync({
      permissions: ['public_profile']});
      
    
      
    if (type === 'success') {

      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential).then(response => {
            
        response.user.getIdTokenResult().then(result => {

        dispatch(
          authenticate(
            response.user.email,
            response.user.uid, 
            result.token,
            parseInt("3600") * 1000
            ));

        const expirationDate = new Date( new Date().getTime() + parseInt("3600") * 1000);
        saveDataToStorage(response.user.email, result.token, response.user.uid, expirationDate);  
        })       
        
      }).catch(error => {
        Alert.alert(error.message)
      })

    } else if (type === 'cancel'){
      Alert.alert('Cancelled');
    }
    }
  }


export const login = (email, password) => {
    return async dispatch => {
        
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3xP9mLVYPTucReQGqEkpD-8kR349XG6I',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
              })
            }
          );

          if(!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
              message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
              message = 'The password was not valid.';
            }
            throw new Error(message);
          }

          const resData = await response.json();

      
    
    dispatch(
      authenticate(
        email,
        resData.localId, 
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
        ));
    const expirationDate = new Date( new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(email, resData.idToken, resData.localId, expirationDate);  
  };
};

export const fetchUserGroups = (groups) => {
  return async (dispatch, getState) => {

    
    var groupArray = Object.keys(groups).map(key => {
      return groups[key];
    });

    groupArray.forEach(groupId => {

      Fire.firebase.database().ref("groups/"+groupId).once('value').then((snapshot => {

        
        const groupData = {
          id: snapshot.key,
          name: snapshot.val().name,
          admin: snapshot.val().admin,
          description: snapshot.val().description,
          city: snapshot.val().city,
          photoUrl: snapshot.val().photoUrl,
          postalCode: snapshot.val().postalCode,
          type: snapshot.val().type,
          members: snapshot.val().members,
        }

        dispatch({type: SET_GROUPS, group: groupData})
        
      }))
    });


  };
};


export const fetchUserData = (userId) => {
  return async (dispatch, getState) => {

      const response = await fetch(
        `https://babyapp-ed94d.firebaseio.com/users/${userId}.json`
      );


      if (!response.ok) {
        console.log(' Response failed from firebase..')
        throw new Error ('NO_DATA 2')
      }
      const data = await response.json();         
         dispatch({
          type: SET_FIREBASE_DATA, 
          firstname: data.firstname, 
          lastname: data.lastname, 
          name: data.name,
          dueDate: data.dueDate,
          birthday: data.birthday, 
          gender: data.gender, 
          postalCode: data.postalCode, 
          city: data.city,
          photoUrl: data.photoUrl
        });
      
       dispatch(fetchUserGroups(data.groups))
    
  }
  }

  export const setPhotoUrl = (photoUrl) => {
    return async (dispatch, getState) => {

      const userId = getState().auth.userId;
      const token = getState().auth.token;
    
      const response = await fetch(
        `https://babyapp-ed94d.firebaseio.com/users/${userId}.json?auth=${token}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            photoUrl: photoUrl
          })
        }
      );
  
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }


      dispatch({type: SET_PHOTO_URL, photoUrl: photoUrl});
    }
  }



export const signUp = (email, password) => {
    return async dispatch => {
        
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3xP9mLVYPTucReQGqEkpD-8kR349XG6I',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
              })
            }
          );

          if (!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_EXISTS') {
              message = 'This email exists already!';
            }
            throw new Error(message);
          }
          
    const resData = await response.json();

    dispatch(
      authenticate(
        email, 
        resData.localId, 
        resData.idToken, 
        parseInt(resData.expiresIn) * 1000
        ));     
        
const expirationDate = new Date( new Date().getTime() + parseInt(resData.expiresIn) * 1000);
saveDataToStorage(email, resData.idToken, resData.localId, expirationDate);          
    };
};

const saveDataToStorage = (email, token, userId, expirationDate) => {
  AsyncStorage.setItem('userData', JSON.stringify({
    email: email,
    token: token,
    userId: userId,
    expiryDate: expirationDate.toISOString()
  }));
}


export const createAdditionalData = (firstname, lastname, name, birthday, gender, postalCode, city) => {
  return async (dispatch, getState) => {

    const token = getState().auth.token;    
    const userId = getState().auth.userId;


    if(token && userId){
      const response = await fetch(
        `https://babyapp-ed94d.firebaseio.com/users/${userId}.json?auth=${token}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstname,
            lastname,
            name,
            birthday,
            gender,
            postalCode,
            city
          })
        }
      );

      if (!response.ok) {
        let message = 'Adding data to Firebase failed!';
        throw new Error(message);
      }
        
      const resData = await response.json();
      dispatch({type: SET_FIREBASE_DATA, firstname, lastname, name,birthday, gender, postalCode, city});
    }
  };
};