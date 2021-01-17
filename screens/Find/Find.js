import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, SafeAreaView, FlatList, TouchableOpacity} from "react-native";
import User from '../../components/User';
import Group from '../../components/Group';
import Fire from '../../Fire';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {ButtonGroup} from 'react-native-elements';
import {addPushTokenToUser} from '../../store/actions/auth'
import {fetchUserDms} from '../../store/actions/directMessage'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import {useDispatch, useSelector} from 'react-redux';
import { useRef } from "react";
import MapContainer from '../../components/MapContainer';
import Autocomplete from 'react-native-autocomplete-input';

 const Find = (props) => {
  const allGroups = useSelector(state => state.allGroups)
  const allUsers = useSelector(state => state.allUsers)

  const [searchText, setSearchText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filteredGroups, setFilteredGroups] = useState([])
  const [cityData, setCityData] = useState([])
  const [hideResults, setHideResults] = useState(false);
  const [coordinates, setCoordinates] = useState(undefined);


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
      allUsers.forEach(user => {
        if(user.city.trim().includes(city.navn.trim())){
          tempUserArray.push(user);
        } else {
        }
      });
      setFilteredUsers(tempUserArray)
    }
    
    if(selectedIndex==1){
      let tempGroupArray = [] 
      allGroups.forEach(group => {
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
  
  setSelectedCityHandler = (item) => {
    renderResults(item);
    setHideResults(true);
    setSearchText('');
  }


    return (
<View style= {styles.parentContainer} >
<Autocomplete
style={styles.searchInput}
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
    pushToken: item.pushToken,
    children: item.children
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
  searchInput: {
    paddingLeft: 20,
    height: 35,
    backgroundColor: 'white'
  }
});

export default Find;

