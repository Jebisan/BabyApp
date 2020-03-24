
import Fire from '../../Fire';

export const ADD_GROUP = 'ADD_GROUP'
export const REMOVE_REQUEST_FROM_GROUP = 'REMOVE_REQUEST_FROM_GROUP'
export const ADD_REQUEST_TO_USER = 'ADD_REQUEST_TO_USER'


export const fetchUserGroups = () => {
    return async (dispatch, getState) => {
      
      const userId = getState().auth.userId;    
  
        Fire.firebase.database().ref("users/"+userId+"/groups").once('value').then((snapshot => {
  
          const groupObject = snapshot.val()
         
         let groupIdsArray = Object.keys(groupObject).map(key => {
            return key
          });

          groupIdsArray.forEach(groupId => {
            Fire.firebase.database().ref("groups/"+groupId).once('value').then((snapshot => {

              let membersArray = Object.keys(snapshot.val().members).map(key => {
                return key
              });
              
              let requestArray = []

              if(snapshot.val().requests){
                 requestArray = Object.keys(snapshot.val().requests).map(key => {
                  return key
                });
              }
          


    
              const group = {id: snapshot.key,...snapshot.val(), members: membersArray, requests: requestArray}

              

              dispatch({type: ADD_GROUP, group})


            }))
          });
          

        }))
        

        
        
        
        
      };
    };



export const requestForMembership = (userId, groupId ) => {
  return async (dispatch, getState) => {

    const token = getState().auth.token;    

      const response = await fetch(
        `https://babyapp-ed94d.firebaseio.com/groups/${groupId}/requests.json?auth=${token}`,
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

export const removeRequestFromGroup = (groupId, personId ) => {
    return async (dispatch, getState) => {

      const token = getState().auth.token;    
  
        const response = await fetch(
          `https://babyapp-ed94d.firebaseio.com/groups/${groupId}/requests/${personId}.json?auth=${token}`,
          {
            method: 'DELETE'
          }
        );
    
  
        if (!response.ok) {
          let message = 'Removing user from requests failed on Firebase!';
          throw new Error(message);
        }
          
        const resData = await response.json();
  
        dispatch({type: REMOVE_REQUEST_FROM_GROUP, groupId, personId})
  
    };
  };

  export const removeRequestFromUser = (userId, requestKey ) => {
    return async (dispatch, getState) => {
      console.log('User ID: ' + userId);
      console.log('Request key: ' + requestKey);
      
      const token = getState().auth.token;    
  
        const response = await fetch(
          `https://babyapp-ed94d.firebaseio.com/users/${userId}/requests/${requestKey}.json?auth=${token}`,
          {
            method: 'DELETE'
          }
        );
    
  
        if (!response.ok) {
          let message = 'Removing user from requests failed on Firebase!';
          throw new Error(message);
        }
          
        const resData = await response.json();
  
        dispatch({type: REMOVE_REQUEST_FROM_GROUP, userId, requestKey})
  
    };
  };


  export const addRequestToUser = (groupId) => {
    return async (dispatch, getState) => {

      const token = getState().auth.token;    
      const userId = getState().auth.userId;    
  
        const response = await fetch(
          `https://babyapp-ed94d.firebaseio.com/users/${userId}/requests/.json?auth=${token}`,
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
        dispatch({type:ADD_REQUEST_TO_USER, groupId})

    };
  };