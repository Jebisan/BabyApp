import Fire from '../../Fire';
import firebase from 'firebase';

export const SET_TEMP_GROUP_DATA = 'SET_TEMP_GROUP_DATA'


export const setTempGroupData = (name, description, postalCode, city, type) => {
    return { type: SET_TEMP_GROUP_DATA, name, description, postalCode, city, type };
};


export const login = (email, password) => {
    return async dispatch => {
        
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3xP9mLVYPTucReQGqEkpD-8kR349XG6I',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
              })
            }
          );

          if(!response.ok) {
            const errorResData = await response.json();
            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if (errorId === 'EMAIL_NOT_FOUND') {
              message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD') {
              message = 'The password was not valid.';
            }
            throw new Error(message);
          }

          const resData = await response.json();
    dispatch(
      authenticate(
        email,
        resData.localId, 
        resData.idToken,
        parseInt(resData.expiresIn) * 1000
        ));
    const expirationDate = new Date( new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    saveDataToStorage(email, resData.idToken, resData.localId, expirationDate);  
  };
};

