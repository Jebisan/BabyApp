import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from "react-native";
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import colors from '../../constants/colors';
import * as Notifications from 'expo-notifications';
import ListView from '../Find/ListView/ListView';
import { useDispatch } from 'react-redux';
import {addPushTokenToUser} from '../../store/actions/auth';

const HomeScreen = props => {

  const dispatch = useDispatch();
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
      Notifications.addPushTokenListener(_handleNotification);
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

  return (
          <View style={styles.parent}>
          <Text style={styles.header} >Velkommen tilbage!</Text>
          {
           // <ListView />
          }

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
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: colors.lightGrey,
  },
  header: {
    fontSize: 22,
    fontFamily: 'roboto-medium',
    top: 160
  }
});

export default HomeScreen;
