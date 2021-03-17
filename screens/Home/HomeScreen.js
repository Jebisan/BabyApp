import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Keyboard } from "react-native";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {useSelector} from 'react-redux';
import colors from '../../constants/colors';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 
import SearchField from '../../components/SearchField';

const HomeScreen = props => {

  const [searchString, setSearchString] = useState('');
  const [inFocus, setInFocus] = useState(false);
  const allGroups = useSelector(state => state.allGroups)
  
  
  useEffect(() => {
  }, [allGroups])

useEffect(() => {
  registerForPushNotificationsAsync()
  
}, [])

  const registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      dispatch(addPushTokenToUser(token));
      Notifications.addListener(_handleNotification);
    } else {
      console.log('Must use physical device for Push Notifications');
    }
  };

  const _handleNotification = notification => {
    // NOTIFICATION RECEIVED IN FOREGROUND
   if(notification.origin=='received') {
    switch(notification.data.type) {
      case 'DM':
      dispatch(fetchUserDms());
        break;
        case 'GM':
          break;
          default:
          }
        }
    // NOTIFICATION RECEIVED IN BACKGROUND
    if(notification.origin=='selected') {
      switch(notification.data.type) {
        case 'DM':
          dispatch(fetchUserDms());
          props.navigation.navigate('DirectMessage', {
            conversationCreated: true,
            chatId: notification.data.chatId,
            pushToken: notification.data.pushToken
          });
          
          break;
          case 'GM':
            props.navigation.navigate('GroupChat', {
              id: notification.data.groupId,
              members: notification.data.members,
              groupName: notification.data.groupName
            });
            break;
            default:
            }
          }
  };

  const clear = () => {
      setSearchString('')
  }

  const back = () => {
    console.log('BACK');
    setSearchString('');
    setInFocus(false);
    Keyboard.dismiss();
  }

  useEffect(() => {
      if(inFocus){
          console.log('In focus!')
      } else {
          console.log('Out of focus')
      }
  }, [inFocus])
  

  return (
          <View style={styles.parent}>
            <SearchField />
          </View>

  );
}

HomeScreen.navigationOptions = navigationData => {

  return {
    headerTitle: 'Hjem',
  };
};

const styles = StyleSheet.create({
  parent: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: colors.lightGrey,
  },
});

export default HomeScreen;
