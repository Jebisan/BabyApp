import React, { useEffect } from 'react';
import {View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';


const HomeScreen = props => {

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
   if(notification.origin=='received') {
    switch(notification.data.type) {
      case 'DM':
      console.log('new DM recieved in foreground')
      
      togglePopDownMessage.current.toggleTooltip();

      dispatch(fetchUserDms());
        break;
        case 'GM':
          break;
          default:
          }
        }

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
    <View style = {styles.parent}>
    <Text style = {styles.headerText}>Velkommen tilbage!</Text>
    </View>
  );
};

HomeScreen.navigationOptions = navigationData => {

  return {
    headerTitle: 'Hjem',
  };
};

const styles = StyleSheet.create({
  parent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100
  } ,
  headerText: {
    fontSize: 26,
    fontWeight: "bold"
  },
});

export default HomeScreen;
