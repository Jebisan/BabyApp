import firebase from 'firebase';

class Fire {
    constructor() {
        this.init()
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
    
  get users() {
    return firebase.database().ref("users");
}

get me() {
    return firebase.database().ref("users/PLSbt76AtqOKWQEAnxehhfLW88F3");
}

    get groups() {
      return firebase.database().ref("groups");
  }

    get firebase(){
        return firebase;
    }

} 

export default new Fire();