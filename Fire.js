import firebase from 'firebase';
import * as Facebook from 'expo-facebook';

class Fire {
    constructor() {
        this.init()
       // this.checkAuth()
    }
    
init = () => {
    if(!firebase.apps.length){
        firebase.initializeApp({
            apiKey: "AIzaSyD3xP9mLVYPTucReQGqEkpD-8kR349XG6I",
            authDomain: "babyapp-ed94d.firebaseapp.com",
            databaseURL: "https://babyapp-ed94d.firebaseio.com",
            projectId: "babyapp-ed94d",
            storageBucket: "babyapp-ed94d.appspot.com",
            messagingSenderId: "879638066108",
            appId: "1:879638066108:web:4b4c8b49e3b0ba8cd6f1b9",
            measurementId: "G-M8PB20MGR9"
        
        });   
    }
}

 logInWithFacebook = () =>  {
     return async dispatch => {
        try {
            await Facebook.initializeAsync('621878081710120');
            const {
              type,
              token,
              expires,
              permissions,
              declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
              permissions: ['public_profile'],
            });
            if (type === 'success') {
              const credential = firebase.auth.FacebookAuthProvider.credential(token)
              firebase.auth().signInWithCredential(credential).then(response => {
              }).catch((error) => {
                console.log(error);
              });
      
            } else {
              // type === 'cancel'
            }
          } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
          }
     }
  }
    

    parse = message => {
        const {user, text, timestamp} = message.val()
        const {key: _id} = message
        const createdAt = new Date(timestamp)

        return {
            _id,
            createdAt,
            text,
             user
        };
    };

    get = callback  => {
        this.messages.on('child_added', snapshot => callback(this.parse(snapshot)));
    }

    off() {
        this.messages.off();
        this.users.off();
    }
 
    get messages() {
        return firebase.database().ref("messages");
    }

    get groups() {
      return firebase.database().ref("groups");
  }

    get users() {
        return firebase.database().ref("users");
    }

    get uid(){
        return (firebase.auth().currentUser ||{}).uid
    }

    get auth(){
        return firebase.auth();
    }

    get firebase(){
        return firebase;
    }

} 

export default new Fire();