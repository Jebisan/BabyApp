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

 import moment from 'moment';


 //TIMESTAMP TO YEAR
 export const timestampToMonth = (timestamp) => { 
   return moment(timestamp).format("MMMM");   
}

 //TIMESTAMP TO MONTH
 export const timestampToYear = (timestamp) => { 
   return moment(timestamp).format("YYYY");   
}

 //TIMESTAMP TO SHORT MONTH
 export const timestampToShortMonth = (timestamp) => { 
   return timestampToMonth(timestamp).slice(0, 3).toUpperCase()
}

 //TIMESTAMP TO DATE NUMBER
 export const timestampToDateNumber = (timestamp) => { 
   return moment(timestamp).format("DD");   
}

 //TIMESTAMP TO TIME. RETURNS e.g '14:50'
 export const timestampToTime = (timestamp) => { 
   return moment(timestamp).format("h:mm");   
}

 //TAKES DD-MM-YYYY AND RETURNS Month e.g Januar
 export const convertDate2 = (date) => {
   var newDate = moment(date, "DD-MM-YYYY")
   
   var newDate2 = moment(newDate).format("MMM YYYY");    
   return newDate2.charAt(0).toUpperCase() + newDate2.slice(1);
}

// RETURNS '1 hour ago', '2 days ago' etc
export const convertTimestamp = (timestamp) => {
   return moment(timestamp).fromNow();
}


// RETURNS '1 hour ago', '2 days ago' etc
export const convertNumberToGender = (gender) => {
   switch(gender){
      case 0: 
         return 'Kvinde'
      case 1: 
         return 'Mand'
      case 2: 
         return 'Andet'
   }
}


export const getGroupTypeName = (groupType) => {
   switch(groupType){
      case 0: 
         return 'Mødre'
      case 1: 
         return 'Fædre'
      case 2: 
         return 'Familie'
   }
}