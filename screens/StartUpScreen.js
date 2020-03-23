import React, { useEffect, useState } from 'react';
import {View, ActivityIndicator, StyleSheet, AsyncStorage, Alert} from 'react-native';
import {authenticate, fetchUserData} from '../store/actions/auth'
import {useDispatch} from 'react-redux';


const StartUpScreen = props => {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    useEffect(() => {   

        const tryLogin = async () => {
            setLoading(true);
            const userData = await AsyncStorage.getItem('userData');
            if(!userData) {
                props.navigation.navigate('Login')
                return;
            }
            const transformedData = JSON.parse(userData);
            const {email, token, userId, expiryDate} = transformedData;
            const expirationDate = new Date(expiryDate);

            if(expirationDate <= new Date() || !token ||!userId) {
                console.log('No valid token stored :( ')
                props.navigation.navigate('Login')
                return; 
            } 

            const expirationTime = expirationDate.getTime() - new Date().getTime();



            dispatch(authenticate(email, userId, token, expirationTime));
            try{
                await dispatch(fetchUserData(userId));
                props.navigation.navigate('MainScreen')
            } catch (error) {
                props.navigation.navigate('Login');
            }

        };

        tryLogin();
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