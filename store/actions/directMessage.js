
import Fire from '../../Fire';

export const SET_DMS = 'SET_DMS';
export const CLEAR_MEMBERS = 'CLEAR_MEMBERS';
export const ADD_MEMBER = 'ADD_MEMBER';


export const fetchUserDms = () => {
    return async (dispatch, getState) => {
  
      const userId = getState().auth.userId;    
  
        Fire.firebase.database().ref("users/"+userId+"/messages").once('value').then((snapshot => {
  
          const dmsObject = snapshot.val()
         
          const dmsArray =  Object.keys(dmsObject).map(key => {
            return {chatId: key}
          });

         dispatch(fetchDmMembers(dmsArray));

          dispatch({type: SET_DMS, directMessages: dmsArray})
        }))
    };
  };

  export const fetchDmMembers = (dmsArray) => {
    return async (dispatch, getState) => {

      console.log(dmsArray);

      dmsArray.forEach(dm => {
        
        
        const userId = getState().auth.userId;    
        
        Fire.firebase.database().ref("chatMembers/"+dm.chatId).once('value').then((snapshot => {
          
          const membersObject = snapshot.val()
          
          const membersArray =  Object.keys(membersObject).map(key => {
            return key
          });

          const user = membersArray.find(id => id!==userId)
          console.log(user);

         dispatch({type: ADD_MEMBER, member: user, chatId: dm.chatId})
        }))
        
        
        
      });
    };
  };

