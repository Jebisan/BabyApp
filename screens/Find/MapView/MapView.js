import React, { useEffect, useState } from "react";
import { StyleSheet, View} from "react-native";
import MapScreen from '../../../components/MapScreen';


 const MapView = (props) => {
  const [searchText, setSearchText] = useState('');


useEffect(() => {
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
  }
}, [searchText])


    return (
      <View style= {styles.parentContainer} >
        <MapScreen navigation = {props.navigation} />
      </View>
    )}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
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

export default MapView;

