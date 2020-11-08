import React, { useEffect } from 'react';
import {useSelector} from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import {TabNavigator, AuthNavigator} from './Navigator';
import StartUpScreen from '../screens/StartUpScreen';

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => !!state.auth.didTryAutoLogin);

    return <NavigationContainer>
            {isAuth && <TabNavigator />}  
            {!isAuth && didTryAutoLogin && <AuthNavigator /> }
            {!isAuth && !didTryAutoLogin && <StartUpScreen />}
          </NavigationContainer>;
  }
  
export default AppNavigator;
