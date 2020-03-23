
export const REMOVE_REQUEST_FROM_GROUP = 'REMOVE_REQUEST_FROM_GROUP'
export const ADD_REQUEST_TO_USER = 'ADD_REQUEST_TO_USER'



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

export const removeRequestFromGroup = (groupId, requestKey ) => {
    return async (dispatch, getState) => {

      const token = getState().auth.token;    
  
        const response = await fetch(
          `https://babyapp-ed94d.firebaseio.com/groups/${groupId}/requests/${requestKey}.json?auth=${token}`,
          {
            method: 'DELETE'
          }
        );
    
  
        if (!response.ok) {
          let message = 'Removing user from requests failed on Firebase!';
          throw new Error(message);
        }
          
        const resData = await response.json();
  
        dispatch({type: REMOVE_REQUEST_FROM_GROUP, groupId, requestKey})
  
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
  
        //dispatch({type: REMOVE_REQUEST_FROM_GROUP, groupId, requestKey})
  
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