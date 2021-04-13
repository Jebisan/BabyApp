import moment from 'moment';

export const generateRandomId = () => {
    var length           = 28;
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }


 //TAKES DD-MM-YYYY AND RETURNS Month e.g Januar
 export const convertDate = (date) => {
   var newDate = moment(date, "DD-MM-YYYY")
   
   var newDate2 = moment(newDate).format("MMMM YYYY");    
   return newDate2
}

 //TAKES DD-MM-YYYY AND RETURNS Month e.g Januar
 export const convertDate2 = (date) => {
   var newDate = moment(date, "DD-MM-YYYY")
   
   var newDate2 = moment(newDate).format("MMM YYYY");    
   return newDate2.charAt(0).toUpperCase() + newDate2.slice(1);
}

// Takes a Firebase object and returns a regular objects
export const convertFirebaseUser = (key, user) => {

   const messagesObj = user.messages;
   const groupsObj = user.groups;
   
   let messagesArray = []
   let groupsArray = []

   // Consider deleting. Might not need users messages?
   if(messagesObj){
     messagesArray = Object.keys(messagesObj).map(key => {
      return key;
     });
   }

   if(groupsObj){
      groupsArray = Object.keys(groupsObj).map(key => {
       return key;
      });
    }
    const convertedData = {id: key, ...user, messages: messagesArray, groups: groupsArray};
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
      console.log('No usersObject');
      return [];
   }
   return usersArray;
}

// Takes an object of objects [GROUP], and returns an array of objects
export const convertFirebaseGroupsToArray = (data) => {
   let groupsArray = []
   const groupsObject = data.val()

      if(!groupsObject) {
         console.log('No group object')
         return []
      }
      groupsArray = Object.keys(groupsObject).map(key => {

         const membersObj = groupsObject[key].members;
         const requestsObj = groupsObject[key].requests;
         
         let membersArray = []
         let requestsArray = []

         if(membersObj){
            membersArray = Object.keys(membersObj).map(key => {
            return key;
           });
         }

         if(requestsObj){
            requestsArray = Object.keys(requestsObj).map(key => {
            return key;
           });
         }

         return {id: key, ...groupsObject[key], members: membersArray, requests: requestsArray, membersDetails: []}
      })

   return groupsArray;
}


// Takes a Firebase Object, and returns a regular object
export const convertFirebaseGroup = (id, data) => {
   const groupObject = data.val()

      if(!groupObject) {
         console.log('No group object')
         return
      }

         const membersObj = groupObject.members;
         const requestsObj = groupObject.requests;
         
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

         return {id, ...groupObject, members: membersArray, requests: requestsArray}
}


