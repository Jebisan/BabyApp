import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View, SafeAreaView, FlatList, TouchableOpacity} from "react-native";
import User from '../../../components/User';
import Group from '../../../components/Group';
import {useSelector} from 'react-redux';
import Autocomplete from 'react-native-autocomplete-input';
import Colors from "../../../constants/colors";
import { ButtonGroup } from "react-native-elements";


 const ListView = (props) => {
  const allGroups = useSelector(state => state.allGroups.allGroups)
  const allUsers = useSelector(state => state.allUsers)

  const [searchText, setSearchText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filteredGroups, setFilteredGroups] = useState([])
  const [cityData, setCityData] = useState([])
  const [hideResults, setHideResults] = useState(false);


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
    let tempGroupArray = [] 
    allGroups.forEach(group => {
      if(group.city.includes(city.navn.trim())){
        tempGroupArray.push(group);
      }
    });
    setFilteredGroups(tempGroupArray);
  }
    if(selectedIndex==1){
      let tempUserArray = [] 
      allUsers.forEach(user => {
        if(user.city.trim().includes(city.navn.trim())){
          tempUserArray.push(user);
        } else {
        }
      });
      setFilteredUsers(tempUserArray)
    }
}
  
  setSelectedCityHandler = (item) => {
    renderResults(item);
    setHideResults(true);
    setSearchText('');
  }


    return (
<SafeAreaView style= {styles.parentContainer} >
<View style={styles.searchInputContainer} >
<Autocomplete
inputContainerStyle={styles.searchInputContainer}
containerStyle={styles.containerStyle}
listContainerStyle = {styles.listContainerStyle}
listStyle	= {styles.listStyle}
style={styles.searchInput}
keyExtractor={item => item.nr}
data={cityData}
hideResults={hideResults}
placeholder="Søg"
defaultValue={searchText}
onChangeText={text => setSearchText(text)}
renderItem={({ item, i }) => (
  <TouchableOpacity onPress={() => setSelectedCityHandler(item)}>
  <Text>{item.navn}</Text>
  </TouchableOpacity>
  )}
  />
  </View>

<ButtonGroup
  onPress={index => setSelectedIndex(index)}
  selectedIndex={selectedIndex}
  buttons={['Grupper', 'Personer']}
  containerStyle={styles.buttonContainer} 
  selectedButtonStyle={styles.buttonSelected}
  buttonStyle={styles.button}
  textStyle={styles.textStyle}
  selectedTextStyle={styles.textStyle}
/>

{
  // Border under ButtonGroup
<View style={{top: 20, borderWidth: 0.5, width: '100%', borderColor: Colors.mediumGrey}} ></View>
}

<View style={styles.foundUsersContainer}>
<SafeAreaView>
{selectedIndex===1 &&
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
/>}

{selectedIndex===0 &&
  <FlatList
  data={filteredGroups}
  renderItem={({ item }) => 
  <TouchableOpacity onPress={() => props.navigation.navigate('GroupDetail', {
    group: item
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
  members = {item.members}
  membersDetails = {item.membersDetails}
  maxSize = {item.maxSize}
  />
  </TouchableOpacity>
}
keyExtractor={item => item.key}
/>}

</SafeAreaView>          
</View>
</SafeAreaView>
)}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  foundUsersContainer: {
    top: 25,
    height: "87,5%",
    marginTop: '-1%',
  },  
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 20,
    borderRadius: 50,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: {width: 3, height: 3},
  },
  buttonSelected: {
    left: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    height: 20,
    borderRadius: 50,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 3, height: 3},  
    backgroundColor: Colors.lightGrey,
  },
  textStyle: {
    color: 'black',
    fontFamily: 'roboto-medium',
    fontSize: 14
  },
  buttonContainer: {
    top: 15,
    width: 250, 
    height: 45, 
    backgroundColor: '#eff6fc',
    borderRadius: 50,
    borderWidth: 0,
    paddingVertical: 5
  },
  searchInputContainer: {
    borderWidth: 0,
    top: 5,
    zIndex: 10,
  },
  containerStyle: {
  },
  listStyle: {
  },
  searchInput: {
    paddingLeft: 20,
    height: 45,
    width: 350,
    backgroundColor: 'white',
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Colors.mediumGrey
  }
});

export default ListView;