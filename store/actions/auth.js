import Fire from '../../Fire';
import { AsyncStorage, Alert } from 'react-native';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT'
export const SET_FIREBASE_DATA = 'SET_FIREBASE_DATA'
export const SET_PHOTO_URL = 'SET_PHOTO_URL'
export const SET_GROUPS = 'SET_GROUPS'
export const SET_PUSH_TOKEN = 'SET_PUSH_TOKEN'
export const ADD_GROUP_TO_USER = 'ADD_GROUP_TO_USER'
export const ADD_USER_TO_GROUP = 'ADD_USER_TO_GROUP'
export const SET_DMS = 'SET_DMS'
export const CREATE_GROUP = 'CREATE_GROUP'
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
    const userId = getState().auth.userId;

    
    if(groups) {
    var groupArray = Object.keys(groups).map(key => {
      return groups[key];
    });
    groupArray.forEach(groupId => {
      
      Fire.firebase.database().ref("groups/"+groupId).once('value').then((snapshot => {
        
        
        const usersOfGroupObject = snapshot.val().members
        
       

        const usersOfGroupArray =  Object.keys(usersOfGroupObject).map(key => {
          return usersOfGroupObject[key]
        });
       

        
       // const newGroupArray = usersOfGroupArray.filter(user=>user!==userId)

        const groupData = {
          id: snapshot.key,
          name: snapshot.val().name,
          admin: snapshot.val().admin,
          description: snapshot.val().description,
          city: snapshot.val().city,
          photoUrl: snapshot.val().photoUrl,
          postalCode: snapshot.val().postalCode,
          groupType: snapshot.val().groupType,
          members: usersOfGroupArray
        }
        
        dispatch({type: SET_GROUPS, group: groupData})
        
      }))
    });
    
  }
    
  };
};

export const fetchUserDms = (directMessageId) => {
  return async (dispatch, getState) => {

    const userId = getState().auth.userId;    


      Fire.firebase.database().ref("directMessages/"+directMessageId).once('value').then((snapshot => {

        const usersOfDmObject = snapshot.val().users

        const usersOfDmArray =  Object.keys(usersOfDmObject).map(key => {
          return {chatId: directMessageId,...usersOfDmObject[key]}
        });

        const newDm = usersOfDmArray.filter(user=>user.userId!==userId)[0]

       // console.log(newDm)
        
        dispatch({type: SET_DMS, directMessage: newDm})

      }))
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
          photoUrl: data.photoUrl,
          pushToken: data.pushToken
        });

        if(data.groups!==undefined){
          dispatch(fetchUserGroups(data.groups))
        }
        


        
        //FETCHING USER DMS

        if(data.messages!==undefined){

          const directMessagesObject = data.messages;          
          
          var directMessagesArray = Object.keys(directMessagesObject).map(key => {
            return directMessagesObject[key].chatId
          });
          
          directMessagesArray.forEach(directMessageId => {
            dispatch(fetchUserDms(directMessageId))
          });
          
        }
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


export const createAdditionalData = (firstname, lastname, name, birthday, gender, postalCode, city, dueDate) => {
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
          })
        }
      );

      if (!response.ok) {
        let message = 'Adding data to Firebase failed!';
        throw new Error(message);
      }
        
      const resData = await response.json();
      dispatch({type: SET_FIREBASE_DATA, firstname, lastname, name,birthday, gender, postalCode, city, dueDate});
    }
  };
};

export const createGroup = (name, description, postalCode, city, groupType, selectedUserIds, photoUrl) => {
  return async (dispatch, getState) => {

    console.log('Selected users:');
    console.log(selectedUserIds);

    const token = getState().auth.token;    
    const userId = getState().auth.userId;

      const response = await fetch(
        `https://babyapp-ed94d.firebaseio.com/groups.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            admin: userId,
            name,
            description,
            postalCode,
            city,
            groupType,
            photoUrl,
            members: selectedUserIds
          })
        }
      );

      if (!response.ok) {
        let message = 'Adding group to Firebase failed!';
        throw new Error(message);
      }
        
      const resData = await response.json();
      
      dispatch({type: CREATE_GROUP, admin:userId, id: resData.name, name, description, postalCode, city, groupType, photoUrl, members: selectedUserIds});
      
      selectedUserIds.forEach(user => {
      dispatch(addGroupToUser(user, resData.name))
      });

  };
};

export const addUserToGroup = (userId, groupId ) => {
  return async (dispatch, getState) => {

    const token = getState().auth.token;    

      const response = await fetch(
        `https://babyapp-ed94d.firebaseio.com/groups/${groupId}/members.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            userId
          )
        }
      );
  

      if (!response.ok) {
        let message = 'Adding group to user failed on Firebase!';
        throw new Error(message);
      }
        
      const resData = await response.json();

      dispatch({type:ADD_USER_TO_GROUP, userId, groupId})

    
  };
};

export const addGroupToUser = (userId, groupId ) => {
  return async (dispatch, getState) => {

    console.log('Putting to user: ' + userId)
    const token = getState().auth.token;    

      const response = await fetch(
        `https://babyapp-ed94d.firebaseio.com/users/${userId}/groups/.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            groupId
          )
        }
      );
  

      if (!response.ok) {
        let message = 'Adding group to user failed on Firebase!';
        throw new Error(message);
      }
        
      const resData = await response.json();
    
  };
};


export const addChatToUser = (chatId, personId) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;    
    const token = getState().auth.token;    


      const response = await fetch(
        `https://babyapp-ed94d.firebaseio.com/users/${userId}/messages.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chatId: chatId
          })
        }
      );

      if (!response.ok) {
        let message = 'Adding chat to this user in Firebase failed!';
        throw new Error(message);
      }
        
      const newDm = {
        chatId,
        userId: personId
      }

      dispatch({type: SET_DMS, directMessage: newDm})
    
  };
};

export const addChatToPerson = (chatId, personId) => {
  return async (dispatch, getState) => {  
    const token = getState().auth.token;    


      const response = await fetch(
        `https://babyapp-ed94d.firebaseio.com/users/${personId}/messages.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            chatId: chatId
          })
        }
      );

      if (!response.ok) {
        let message = 'Adding chat to person in Firebase failed!';
        throw new Error(message);
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