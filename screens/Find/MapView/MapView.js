import React, { useEffect, useState } from "react";
import { StyleSheet, View, SafeAreaView} from "react-native";
import {useSelector} from 'react-redux';
import MapContainer from '../../../components/MapContainer';

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
  <MapContainer coordinates = {coordinates} navigation = {props.navigation} />
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

