import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, SafeAreaView, FlatList, TouchableOpacity} from "react-native";
import cityData from '../../cities';
import User from '../../components/User';
import Group from '../../components/Group';
import Fire from '../../Fire';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {ButtonGroup} from 'react-native-elements';
import {addPushTokenToUser} from '../../store/actions/auth'
import {fetchUserDms} from '../../store/actions/directMessage'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import {useDispatch, useSelector} from 'react-redux';
import { Tooltip } from 'react-native-elements';
import { useRef } from "react";





 const Find = (props) => {
  const togglePopDownMessage = useRef(null);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);

  const [searchText, setSearchText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [city, setCity] = useState('')
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filteredGroups, setFilteredGroups] = useState([])
  const [textFieldInFocus, setTextFieldInFocus] = useState(false)
 
  useEffect(() => {
    registerForPushNotificationsAsync();
   getUsers();
   getGroups();
  }, [])

  const getUsers = () => {
    Fire.users.once('value').then((snapshot) =>{
     obj = snapshot.val()
     var result = Object.keys(obj).map((value) => {
        return {key: value,  ...obj[value]};
     });
     filteredResult = result.filter(user => user.key!==userId)
     setUsers(filteredResult)
   }).catch(error => {
     console.log(error);
   });
};

const getGroups = () => {
  
  Fire.groups.once('value').then((snapshot) =>{
    obj = snapshot.val()
    var result = Object.keys(obj).map((value) => {
      return {key: value,  ...obj[value]};
    });
    setGroups(result)
  }).catch(error => {
    console.log(error);
  });
}

  useEffect(() => {    
    if(selectedIndex==0){
      let tempUserArray = [] 
      users.forEach(user => {
        if(user.city.includes(city.name)){
          tempUserArray.push(user);
        }
      });
    setFilteredUsers(tempUserArray)
    }

    if(selectedIndex==1){
      let tempGroupArray = [] 
      groups.forEach(group => {
        if(group.city.includes(city.name)){
          tempGroupArray.push(group);
        }
      });
    setFilteredGroups(tempGroupArray);
    }
  }, [city, selectedIndex])



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
      <View style={styles.searchContainer}>
      <Tooltip 
      ref={togglePopDownMessage}

      popover={<Text>Ny besked</Text>}
      toggleOnPress={true}
      withOverlay={false}
      onClose={() => props.navigation.navigate('DirectMessages')}
      >
        

      </Tooltip>


          <SearchableDropdown
          setTextFieldInFocus={(value) => setTextFieldInFocus(value)}
          onItemSelect={(item) => {
            setCity(item);
          }}
          containerStyle={{ padding: 5 }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: '#f6f6f6'
          }}
          itemTextStyle={{ color: '#222' }}
          itemsContainerStyle={{ maxHeight: 166 }}
          items={cityData}
          resetValue={false}
          textInputProps={
            {
              onTextChange: text => setSearchText(text),
              placeholder: "Vælg by",
              underlineColorAndroid: "transparent",
              style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
              },
              
            }
          }
          listProps={
            {
              nestedScrollEnabled: true,
            }
          }
      />

   

          {textFieldInFocus ? (
            null
          ) : (
            <View>
            <ButtonGroup
            onPress={index => setSelectedIndex(index)}
            selectedIndex={selectedIndex}
            buttons={['Personer', 'Grupper']}
            containerStyle={{height: 30}} 
            
            />

            <View style={styles.foundUsersContainer}>
            <SafeAreaView style={styles.container}>

          {selectedIndex===0? 
            <FlatList
            data={filteredUsers}
            renderItem={({ item }) => 
            <TouchableOpacity onPress={() => props.navigation.navigate('UserDetail', {
              id: item.key,
              name: item.name,
              gender: item.gender,
              dueDate: item.dueDate,
              city: item.city,
              postalCode: item.postalCode,
              birthday: item.birthday,
              photoUrl: item.photoUrl,
              pushToken: item.pushToken
            })}>
                <User
                name={item.name}
                dueDate={item.dueDate}
                gender={item.gender}
                city={item.city}
                postalCode={item.postalCode}
                photoUrl={item.photoUrl}
                />
                </TouchableOpacity>
              }
            keyExtractor={item => item.key}
          />
          : null}

          {selectedIndex===1? 
            <FlatList
            data={filteredGroups}
            renderItem={({ item }) => 
            <TouchableOpacity onPress={() => props.navigation.navigate('GroupDetail', {
              groupId: item.key,
              name: item.name,
              description: item.description,
              members: item.members,
              admin: item.admin,
              guestView: true
            })}>
                <Group
                id={item.key}
                name={item.name}
                description={item.description}
                city={item.city}
                postalCode={item.postalCode}
                photoUrl={item.photoUrl}
                />
                </TouchableOpacity>
              }
            keyExtractor={item => item.key}
          />
          : null}
        


          </SafeAreaView>
          
          </View>
          </View>
          )
          }

</View>
    );
  }

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  foundUsersContainer: {
    /*
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    */
  },
  buttonContainer: {
    flexDirection:'row',
    justifyContent: 'space-evenly',
    padding: 1,
  },
});

export default Find;
