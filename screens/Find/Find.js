import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, SafeAreaView, FlatList, TouchableOpacity} from "react-native";
// import cityData from '../../cities';
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
import { useRef } from "react";
import MapContainer from '../../components/MapContainer';
import Autocomplete from 'react-native-autocomplete-input';

 const Find = (props) => {
  const togglePopDownMessage = useRef(null);
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId);

  const [searchText, setSearchText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filteredGroups, setFilteredGroups] = useState([])
  const [cityData, setCityData] = useState([])
  const [hideResults, setHideResults] = useState(false);
  const [coordinates, setCoordinates] = useState(undefined);
 
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
  setHideResults(false);
  if(searchText) {
    const tempPostnummerData = []
    fetch(`https://dawa.aws.dk/postnumre/autocomplete?q=${searchText}`).then((response) => {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
        response.status);
        return;
      }      
      response.json().then(data => {
        const newData = [];
        data.forEach(city => {
          newData.push(city.postnummer);
        });
        setCityData(newData);
      });
    }
    ).catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  } 
  else {
    setCityData([]);
  }
}, [searchText])


const renderResults = city => {
    if(selectedIndex==0){
      let tempUserArray = [] 
      users.forEach(user => {
        if(user.city.trim().includes(city.navn.trim())){
          tempUserArray.push(user);
        } else {
        }
      });
      setFilteredUsers(tempUserArray)
    }
    
    if(selectedIndex==1){
      let tempGroupArray = [] 
      groups.forEach(group => {
        if(group.city.includes(city.navn.trim())){
          tempGroupArray.push(group);
        }
      });
      setFilteredGroups(tempGroupArray);
    }

    if(selectedIndex==2){
      const coordinates = {
        latitude: city.visueltcenter_y,
        longitude: city.visueltcenter_x,
        latitudeDelta: 7.0922,
        longitudeDelta: 7.0421
      }
      setCoordinates(coordinates);
    }
  
}

 

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
  
  setSelectedCityHandler = (item) => {
    renderResults(item);
    setHideResults(true);
    setSearchText('');
  }


    return (
<View style= {styles.parentContainer} >
<Autocomplete
keyExtractor={item => item.nr}
data={cityData}
hideResults={hideResults}
placeholder="Søg efter by"
defaultValue={searchText}
onChangeText={text => setSearchText(text)}
renderItem={({ item, i }) => (
  <TouchableOpacity onPress={() => setSelectedCityHandler(item)}>
    <Text>{item.navn}</Text>
</TouchableOpacity>
)}
/>
<ButtonGroup
onPress={index => setSelectedIndex(index)}
selectedIndex={selectedIndex}
buttons={['Personer', 'Grupper', 'Kort']}
containerStyle={{height: 30}} 
/>


<View style={styles.foundUsersContainer}>
<SafeAreaView style={styles.listContainer}>
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
    firstTimer: item.firstTimer,
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
    guestView: true,
    dueDate: item.dueDate
  })}>
  <Group
  id={item.key}
  name={item.name}
  description={item.description}
  city={item.city}
  postalCode={item.postalCode}
  photoUrl={item.photoUrl}
  admin = {item.admin}
  dueDate = {item.dueDate}
  />
  </TouchableOpacity>
}
keyExtractor={item => item.key}
/>
: null}

{selectedIndex===2? 
  <MapContainer coordinates = {coordinates} navigation = {props.navigation} />
  : null
}

</SafeAreaView>          
</View>
</View>
)}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  button: {
    padding: 10,
  },
  foundUsersContainer: {
    height: "87,5%",
    marginTop: '-1%',
  },
  listContainer: {
    flex: 1
  },
  buttonContainer: {
    flexDirection:'row',
    justifyContent: 'space-evenly',
    padding: 1,
  },
});

export default Find;

