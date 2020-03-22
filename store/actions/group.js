export const REMOVE_REQUEST_FROM_GROUP = 'REMOVE_REQUEST_FROM_GROUP'


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

