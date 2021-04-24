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

export const getGroupTypeName = (groupType) => {
   console.log(groupType)
   switch(groupType){
      case 0: 
         return 'Mødre'
      case 1: 
         return 'Fædre'
      case 2: 
         return 'Familie'
   }
}