import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { useSelector } from 'react-redux';

const MapScreen = props => {

  const allGroups = useSelector(state => state.allGroups)


  const [location, setLocation] = useState(mapRegion);

  useEffect(() => {
    if(props.location) {
      setLocation({
        latitude: props.location.latitude,
        longitude: props.location.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421

      }
        )
    }
  }, [props.location])


  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  useEffect(() => {
    console.log(allGroups);
  }) 

  return (
      <MapView style={styles.map} region={location}>
    
   {allGroups.map((group, index) => (
       <Marker key={group.key} coordinate={group.location} onPress={() => props.navigation.navigate('GroupDetail', {
        groupId: group.id,
        name: group.name,
        description: group.description,
        members: group.members,
        admin: group.admin,
        guestView: true,
        dueDate: group.dueDate
      })}  ></Marker>
    ))}
      </MapView>
  )
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  }
});

export default MapScreen;
