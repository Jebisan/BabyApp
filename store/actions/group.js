
import Fire from '../../Fire';

export const ADD_GROUP = 'ADD_GROUP'
export const ADD_REQUEST_TO_USER = 'ADD_REQUEST_TO_USER'
export const ADD_USER_TO_GROUP = 'ADD_USER_TO_GROUP';
export const CREATE_GROUP = 'CREATE_GROUP';
export const REMOVE_REQUEST_FROM_GROUP = 'REMOVE_REQUEST_FROM_GROUP';
export const ADD_MEMBER_TO_GROUP = 'ADD_MEMBER_TO_GROUP';
export const ADD_USER_TO_REQUESTS = 'ADD_USER_TO_REQUESTS';
export const CLEAR_GROUP_MEMBERS = 'CLEAR_GROUP_MEMBERS';
export const CLEAR_GROUP_REQUESTS = 'CLEAR_GROUP_REQUESTS';

export const fetchUserGroups = () => {
    return async (dispatch, getState) => {
      
      const userId = getState().auth.userId;    
  
        Fire.firebase.database().ref("users/"+userId+"/groups").once('value').then(snapshot => {
  
          if(snapshot.val()){

            const groupObject = snapshot.val()
            
            let groupIdsArray = Object.keys(groupObject).map(key => {
              return key
            });
            
            groupIdsArray.forEach(groupId => {
              Fire.firebase.database().ref("groups/"+groupId).once('value').then((snapshot => {
                
                const group = {id: snapshot.key, ...snapshot.val(), members: [], requests: []}
                dispatch({type: ADD_GROUP, group})
              }))
            }); 
          }
        })
      };
    };



export const addRequestToGroup = (userId, groupId ) => {
  return async (dispatch, getState) => {

    const token = getState().auth.token;    

      const response = await fetch(
        `https://babyapp-ed94d.firebaseio.com/groupRequests/${groupId}/${userId}.json?auth=${token}`,
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
          `https://babyapp-ed94d.firebaseio.com/groupRequests/${groupId}/${personId}.json?auth=${token}`,
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
  
     //   dispatch({type: REMOVE_REQUEST_FROM_GROUP, userId, requestKey})
  
    };
  };


  export const addRequestToUser = (groupId) => {
    return async (dispatch, getState) => {

      const token = getState().auth.token;    
      const userId = getState().auth.userId;    
  
        const response = await fetch(
          `https://babyapp-ed94d.firebaseio.com/users/${userId}/requests/${groupId}.json?auth=${token}`,
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
          let message = 'Adding group to user failed on Firebase!';
          throw new Error(message);
        }
          
        const resData = await response.json();
        dispatch({type:ADD_REQUEST_TO_USER, groupId: groupId})

    };
  };

  export const createGroup = (name, description, postalCode, city, groupType, selectedUserIds, photoUrl, dueDate) => {
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
              dueDate
            })
          }
        );
  
        if (!response.ok) {
          let message = 'Adding group to Firebase failed!';
          throw new Error(message);
        }
          
        const resData = await response.json();
        
        dispatch({type: CREATE_GROUP, admin:userId, id: resData.name, name, description, postalCode, city, groupType, photoUrl, dueDate});
      

        selectedUserIds.forEach(user => {
        dispatch(addGroupToUser(user, resData.name))
        });

        selectedUserIds.forEach(id => {
          dispatch(addUserToGroup(id, resData.name))
        });
  
    };
  };


  export const addGroupToUser = (userId, groupId ) => {
    return async (dispatch, getState) => {
  
      console.log('Putting to user: ' + userId)
      const token = getState().auth.token;    
  
        const response = await fetch(
          `https://babyapp-ed94d.firebaseio.com/users/${userId}/groups/${groupId}.json?auth=${token}`,
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
          let message = 'Adding group to user failed on Firebase!';
          throw new Error(message);
        }
          
        const resData = await response.json();
      
    };
  };

  export const addUserToGroup = (userId, groupId, user ) => {
    return async (dispatch, getState) => {
  
      const token = getState().auth.token;    
  
        const response = await fetch(
          `https://babyapp-ed94d.firebaseio.com/groupMembers/${groupId}/${userId}.json?auth=${token}`,
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
          let message = 'Adding user to group failed on Firebase!';
          throw new Error(message);
        }
          
        const resData = await response.json();
        if(user){
          dispatch({type: ADD_USER_TO_GROUP, groupId, user})
        }

    };
  };

  export const getMembers = (groupId) => {
    return async (dispatch, getState) => {

    Fire.firebase.database().ref("groupMembers/"+groupId).once('value').then(snapshot => {
      if(snapshot.val()){

        dispatch({type: CLEAR_GROUP_MEMBERS, groupId})

        const membersArray = Object.keys(snapshot.val()).map(key => {
          return key
        });
        
        membersArray.forEach(member => {
          Fire.firebase.database().ref("users/"+member).once('value').then((snapshot => {
            const obj = snapshot.val()  

            if(!obj){
              return;
            }

            let childrenArray = []

            if(obj.children){
              childrenArray = Object.keys(obj.children).map(key => {
                return {id: key, ...obj.children[key]};
              });
            }

            const user = {
              id: snapshot.key,
              name: obj.name, 
              gender: obj.gender,
              dueDate: obj.dueDate,
              city: obj.city,
              postalCode: obj.postalCode,
              birthday: obj.birthday,
              photoUrl: obj.photoUrl?obj.photoUrl:'http://criticare.isccm.org/assets/images/male_placeholder.png',
              pushToken: obj.pushToken,
              children: childrenArray
            }       
            
            dispatch({type: ADD_USER_TO_GROUP, groupId, user})
          })
          )
        })
      }
      })
    };
  }



  export const getRequests = (groupId) => {
    return async (dispatch, getState) => {


    Fire.firebase.database().ref("groupRequests/"+groupId).once('value').then(snapshot => {
      if(snapshot.val()){

        dispatch({type: CLEAR_GROUP_REQUESTS, groupId})

        const requestsArray = Object.keys(snapshot.val()).map(key => {
          return key
        });
        
        requestsArray.forEach(requester => {
          Fire.firebase.database().ref("users/"+requester).once('value').then((snapshot => {
            const obj = snapshot.val()  
            
            const user = {
              personId: snapshot.key,
              name: obj.name, 
              photoUrl: obj.photoUrl?obj.photoUrl:'http://criticare.isccm.org/assets/images/male_placeholder.png',
              pushToken: obj.pushToken,
              birthday: obj.birthday,
              city: obj.city,
              postalCode: obj.postalCode,
              gender: obj.gender,
              dueDate: obj.dueDate,
            }    
            
            dispatch({type: ADD_USER_TO_REQUESTS, groupId, user})
    
          })
          )
        })
      }
      })
    }
  }