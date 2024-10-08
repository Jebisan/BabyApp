
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
export const ADD_POSTS_TO_GROUP = 'ADD_POSTS_TO_GROUP';
export const CREATE_POST = 'CREATE_POST';


export const fetchUserGroups = () => {
    return async (dispatch, getState) => {
      
      const userId = getState().auth.userId;    
  
        Fire.firebase.database().ref("users/"+userId+"/groups").once('value').then(snapshot => {

          if(snapshot.val()){

            const groupObject = snapshot.val()
            
            let groupIdsArray = Object.keys(groupObject).map(key => {
              return key
            });
            
            groupIdsArray.forEach(id => {
              Fire.firebase.database().ref("groups/"+id).once('value').then((data => {

                const membersObject = data.val().members
                let membersArray = Object.keys(membersObject).map(id => {
                  return id
                });

                const group = {id, ...data.val(), members: [], memberIds: membersArray, requests: []}
                dispatch({type: ADD_GROUP, group})
              }))
            }); 
          }
        })
      };
    };


export const fetchUserGroupsPosts = (groupId) => {
  return async (dispatch, getState) => {
      Fire.firebase.database().ref("posts/" + groupId).once('value').then(snapshot => {

        if(snapshot.val()){

          const listOfUserIds = new Set()

          
          let posts = Object.keys(snapshot.val()).map(id => {
            listOfUserIds.add(snapshot.val()[id].author)
            return {id, ...snapshot.val()[id]}
          });

          listOfUserIds.forEach(id => {
            Fire.firebase.database().ref("users/"+id).once('value').then((data => {
              posts = posts.map(post => {
                if(post.author === id) {
                  return {
                    ...post,
                    author: {
                      name: data.val().name,
                      photoUrl: data.val().photoUrl && data.val().photoUrl
                    },
                  }
                } else {
                  return post
                }
              })
            dispatch({type: ADD_POSTS_TO_GROUP, posts, groupId})
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
          `https://babyapp-ed94d.firebaseio.com/groups/${groupId}/${userId}.json?auth=${token}`,
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

  export const getMembers = (memberIds, groupId) => {
    return async (dispatch, getState) => {
      memberIds.forEach(memberId => {
          Fire.firebase.database().ref("users/"+memberId).once('value').then((snapshot => {
            const obj = snapshot.val()  

            if(!obj){
              return;
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
            }
            dispatch({type: ADD_USER_TO_GROUP, groupId, user})
          })
          )
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

  export const createPost = (groupId, post, uri) => {
    return async (dispatch, getState) => {
  
      const token = getState().auth.token;    
      const auth = getState().auth;
  
        const response = await fetch(
          `https://babyapp-ed94d.firebaseio.com/posts/${groupId}.json?auth=${token}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
          }
        );
  
        if (!response.ok) {
          let message = 'Adding post to Firebase failed!';
          throw new Error(message);
        }

        const resData = await response.json();

        // Now upload image to Firebase Storage
        const postId = resData.name
        const url = await uploadImage(groupId, postId, uri)
        
        // Upload ImageUrl to Firebase DB

          const urlResponse = await fetch(
            `https://babyapp-ed94d.firebaseio.com/posts/${groupId}/${postId}/photoUrl.json?auth=${token}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(url)
            }
          );

          if (!urlResponse.ok) {
            let message = `Adding post's photoUrl to Firebase failed!`;
            throw new Error(message);
          }

          dispatch({type: CREATE_POST, groupId, post: {
            id: resData.name,
            ...post, 
            author: {name: auth.name}, 
            userPhotoUrl: auth.photoUrl,
            photoUrl: url
          }
      })
    };
  };

  const uploadImage = async(groupId, postId, uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    var ref = Fire.firebase.storage().ref().child('images/profilePictures/'+'POST'+'.jpg');
    var uploadTask = ref.put(blob)
    return uploadTask.snapshot.ref.getDownloadURL()
  }