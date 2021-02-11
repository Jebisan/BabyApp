import Fire from '../../Fire';
import { AsyncStorage, Alert } from 'react-native';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const SET_FIREBASE_DATA = 'SET_FIREBASE_DATA';
export const SET_PHOTO_URL = 'SET_PHOTO_URL';
export const SET_PUSH_TOKEN = 'SET_PUSH_TOKEN';
export const SET_DID_TRY_AUTO_LOGIN = 'SET_DID_TRY_AUTO_LOGIN';
import * as Facebook from 'expo-facebook';
import firebase from 'firebase';
import {fetchUserDms} from './directMessage';
import {fetchUserGroups} from './myGroups';
import {fetchAllGroups} from './allGroups';
import {fetchAllUsers} from './allUsers';

let timer;

export const setDidTryAutoLogin = () => {
  return { type: SET_DID_TRY_AUTO_LOGIN }
}

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

  dispatch(fetchEverything(resData.localId))
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

      let requestsArray = []


      if(data.requests){
        requestsArray = Object.keys(data.requests).map(key => {
          return key
        });
      }

      let childrenArray = []


      if(data.children){
        childrenArray = Object.keys(data.children).map(key => {
          return {id: key, ...data.children[key]};
        });
      }
      
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
          photoUrl: data.photoUrl,
          pushToken: data.pushToken,
          requests: requestsArray,
          firstTimer: data.firstTimer,
          children: childrenArray
        });  
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


export const createAdditionalData = (firstname, lastname, name, birthday, gender, postalCode, city, dueDate, firstTimer) => {
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
            city,
            dueDate,
            firstTimer
          })
        }
      );

      if (!response.ok) {
        let message = 'Adding data to Firebase failed!';
        throw new Error(message);
      }
        
      const resData = await response.json();
      dispatch({type: SET_FIREBASE_DATA, firstname, lastname, name,birthday, gender, postalCode, city, dueDate, firstTimer});
    }
  };
};







export const addPushTokenToUser = (pushToken) => {
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
            pushToken: pushToken
          })
        }
      );

      if (!response.ok) {
        let message = 'Adding pushToken to user in Firebase failed!';
        throw new Error(message);
      }

      dispatch({type: SET_PUSH_TOKEN, pushToken: pushToken});
    
  };
};

export const fetchEverything = (userId) => {
  return async (dispatch, getState) => {
  Promise.all(
      [
      dispatch(fetchUserData(userId)),
      dispatch(fetchUserDms()),
      dispatch(fetchUserGroups()),
      dispatch(fetchAllGroups()),
      dispatch(fetchAllUsers())
  ]
      ).then(() => {
          dispatch({'type': 'SET_EVERYTHING_FETCHED', value: true})
      }).catch(error => {
          Alert.alert('Error', 'An error occued when fetching data', [
            { text: "OK", onPress: () => dispatch(logOut())}
          ])
          console.log(error);
      }) 
  };
}