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