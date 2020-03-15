import React from 'react';
import { StyleSheet } from 'react-native';
import NavigationContainer from './navigation/NavigationContainer';
import {enableScreens} from 'react-native-screens';
import { createStore , combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import authReducer from './store/reducers/auth';
import groupReducer from './store/reducers/group';
import directMessageReducer from './store/reducers/directMessage';
import {composeWithDevTools} from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';


export default function App() {
  
  enableScreens();

  const rootReducer = combineReducers({
    auth: authReducer,
    groups: groupReducer,
    directMessages: directMessageReducer
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk)); 

  return (
   <Provider store = {store}>
      <NavigationContainer/>
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
