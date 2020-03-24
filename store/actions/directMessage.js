
import Fire from '../../Fire';

export const SET_DMS = 'SET_DMS'

export const fetchUserDms = () => {
    return async (dispatch, getState) => {
  
      const userId = getState().auth.userId;    
  
        Fire.firebase.database().ref("users/"+userId+"/messages").once('value').then((snapshot => {
  
          const dmsObject = snapshot.val()
         
          const dmsArray =  Object.keys(dmsObject).map(key => {
            return key
          });

          dispatch({type: SET_DMS, directMessages: dmsArray})
        }))
    };
  };