// Takes a Firebase object and returns a regular objects
export const convertFirebaseUser = (id, user) => {

   const messagesObj = user.messages;
   const groupsObj = user.groups;
   
   let messagesArray = []
   let groupsArray = []

   // Consider deleting. Might not need users messages?
   if(messagesObj){
     messagesArray = Object.keys(messagesObj).map(id => {
      return id;
     });
   }

   if(groupsObj){
      groupsArray = Object.keys(groupsObj).map(id => {
       return id;
      });
    }
    const convertedData = {id, ...user, messages: messagesArray, groups: groupsArray};
   return convertedData
}

// Takes an object of objects [USER], and returns an array of objects
export const convertFirebaseUsersToArray = (data) => {
   let usersArray = []
   const usersObject = data.val();
   
   if (usersObject) {
      usersArray = Object.keys(usersObject).map(key => {
         return convertFirebaseUser(key, usersObject[key]);
      })
   } else {
      console.error('No usersObject');
      return [];
   }
   return usersArray;
}

// Takes an object of objects [GROUP], and returns an array of objects
export const convertFirebaseGroupsToArray = (data) => {
   let groupsArray = []
   const groupsObject = data.val();
   
   if (groupsObject) {
      groupsArray = Object.keys(groupsObject).map(key => {
         return convertFirebaseGroup(key, groupsObject[key]);
      })
   } else {
      console.error('No groupsObject');
      return [];
   }
   return groupsArray;
}


// Takes a Firebase Object, and returns a regular object
export const convertFirebaseGroup = (id, group) => {
      if(!group) {
         console.log('No group object')
         return
      }
         const membersObj = group.members;
         const requestsObj = group.requests;
         
         let membersArray = []
         let requestsArray = []

         if(membersObj){
            membersArray = Object.keys(membersObj).map(id => {
            return id;
           });
         }

         if(requestsObj){
            requestsArray = Object.keys(requestsObj).map(id => {
            return id;
           });
         }

         return {id, ...group, members: membersArray, requests: requestsArray}
}