
import Fire from '../../Fire';

export const SET_DMS = 'SET_DMS';
export const CLEAR_MEMBERS = 'CLEAR_MEMBERS';
export const ADD_MEMBER = 'ADD_MEMBER';
export const ADD_DM = 'ADD_DM';


export const fetchUserDms = () => {
    return async (dispatch, getState) => {
  
      const userId = getState().auth.userId;    
  
        Fire.firebase.database().ref("users/"+userId+"/messages").once('value').then((snapshot => {

          if(snapshot.val()){
            const dmsObject = snapshot.val()
            
            const dmsArray =  Object.keys(dmsObject).map(key => {
              return {chatId: key}
            });
            
            dispatch(fetchDmMembers(dmsArray));
            
            dispatch({type: SET_DMS, directMessages: dmsArray})
          }
        }))
    };
  };

  export const fetchDmMembers = (dmsArray) => {
    return async (dispatch, getState) => {

    
      dmsArray.forEach(dm => {
        
        
        const userId = getState().auth.userId;    
        
        Fire.firebase.database().ref("chatMembers/"+dm.chatId).once('value').then((snapshot => {
          
          const membersObject = snapshot.val()
          
          const membersArray =  Object.keys(membersObject).map(key => {
            return key
          });

          const user = membersArray.find(id => id!==userId)
          

         dispatch({type: ADD_MEMBER, member: user, chatId: dm.chatId})
        }))
        
        
        
      });
    };
  };



  export const addChatToUser = (chatId, personId) => {
    return async (dispatch, getState) => {
      const userId = getState().auth.userId;    
      const token = getState().auth.token;    
  
  
        const response = await fetch(
          `https://babyapp-ed94d.firebaseio.com/users/${userId}/messages/${chatId}.json?auth=${token}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              true
            )
          }
        );
  
        if (!response.ok) {
          let message = 'Adding chat to this user in Firebase failed!';
          throw new Error(message);
        }

        const newDm = {chatId: chatId, userId: personId}
  
        dispatch({type: ADD_DM, newDm: newDm})
      
    };
  };
  
  export const addChatToPerson = (chatId, personId) => {
    return async (dispatch, getState) => {  
      const token = getState().auth.token;    
  
  
        const response = await fetch(
          `https://babyapp-ed94d.firebaseio.com/users/${personId}/messages/${chatId}.json?auth=${token}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(
              true
            )
          }
        );
  
        if (!response.ok) {
          let message = 'Adding chat to person in Firebase failed!';
          throw new Error(message);
        }
    };
  };
  