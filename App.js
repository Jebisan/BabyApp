import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import {enableScreens} from 'react-native-screens';
import { createStore , combineReducers, applyMiddleware} from 'redux';
import {Provider, useSelector} from 'react-redux';
import authReducer from './store/reducers/auth';
import myGroupsReducer from './store/reducers/group';
import allGroupsReducer from './store/reducers/allGroups';
import allUsersReducer from './store/reducers/allUsers';
import directMessageReducer from './store/reducers/directMessage';
import ReduxThunk from 'redux-thunk';
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

const fetchFonts = () => {
return Font.loadAsync({
  'roboto-light': require('./assets/fonts/Roboto-Light.ttf'),
  'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
  'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
  'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
});
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded) {
    return <AppLoading 
    startAsync={fetchFonts} 
    onFinish={() => setDataLoaded(true)} 
    onError={error => console.log(error)}
    />;
  }

  enableScreens();

  const rootReducer = combineReducers({
    auth: authReducer,
    allGroups: allGroupsReducer,
    allUsers: allUsersReducer,
    myGroups: myGroupsReducer,
    directMessages: directMessageReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); 

  return (
   <Provider store = {store}>
      <AppNavigator/>
   </Provider>
  );
}

const styles = StyleSheet.create({


  parent: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  picker: {
    paddingTop: 10,
    paddingBottom: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixtures: {
    paddingTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  loading: {
    width: 200,
    height: 200,
  }
});
