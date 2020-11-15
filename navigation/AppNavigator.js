import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import {ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {TabNavigator, AuthNavigator} from './Navigator';
import StartUpScreen from '../screens/StartUpScreen';

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => !!state.auth.didTryAutoLogin);
  const everythingFetched = useSelector(state => !!state.auth.everythingFetched);

  useEffect(() => {
    console.log('isAuth:', isAuth, 
    'everything fetched:', everythingFetched, 
    'didTryAutoLogin', didTryAutoLogin)
  }, [isAuth, everythingFetched, didTryAutoLogin])

    return <NavigationContainer>
            {isAuth && !everythingFetched && <ActivityIndicator style={styles.loadingScreen} size='large' />}
            {isAuth && everythingFetched && <TabNavigator />}  
            {!isAuth && didTryAutoLogin && <AuthNavigator /> }
            {!isAuth && !didTryAutoLogin && <StartUpScreen />}
          </NavigationContainer>;
  }

  const styles = StyleSheet.create({
    loadingScreen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });
  
export default AppNavigator;
