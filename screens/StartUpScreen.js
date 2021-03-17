import React, { useEffect, useState } from 'react';
import {View, ActivityIndicator, StyleSheet, AsyncStorage, Alert} from 'react-native';
import {authenticate, fetchEverything, setDidTryAutoLogin} from '../store/actions/auth';
import {useDispatch} from 'react-redux';


const StartUpScreen = props => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [valid, setValid] = useState(true);

    useEffect(() => {   

        const checkVersion = () => {
            if (!valid) {
                Alert.alert('Du bliver nødt til at opdatere bror..')
                return;
            } else {
                tryLogin();
            }
        }

        const tryLogin = async () => {
            setLoading(true);
            const userData = await AsyncStorage.getItem('userData');
            if(!userData) {
           dispatch(setDidTryAutoLogin())
                return;
            }
            const transformedData = JSON.parse(userData);
            const {email, token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);

            if(expirationDate <= new Date() || !token ||!userId) {
                console.log('No valid token stored :( ')
                dispatch(setDidTryAutoLogin())
                return; 
            } 

            const expirationTime = expirationDate.getTime() - new Date().getTime();

            dispatch(authenticate(email, userId, token, expirationTime));
            try{
                dispatch(fetchEverything(userId, dispatch));
            } catch (error) {
                console.log('Error fetch user data in StartUpScreen')
            }
        };
        
        checkVersion()
    }, [dispatch])

    return <View style={styles.screen}>
    <ActivityIndicator size='large'  />
    </View>
}



const styles = StyleSheet.create({
screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
}
})

export default StartUpScreen;