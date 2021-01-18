import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { useSelector } from 'react-redux';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../constants/colors';
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

  return (
      <MapView style={styles.map} mapType={'mutedStandard'} region={location}>
    
   {allGroups.map((group, index) => (
       <Marker key={group.key} coordinate={group.location} onPress={() => props.navigation.navigate('GroupDetail', {
        groupId: group.key,
        name: group.name,
        description: group.description,
        admin: group.admin,
        guestView: true,
        dueDate: group.dueDate
      })}>
      <View style={styles.group}>
      <FontAwesome name='group' size={14} color={Colors.primary} 
      />
      </View>
      </Marker>
    ))}
      </MapView>
  )
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  group: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25, 
    height: 25, 
    borderRadius: 50, 
    backgroundColor: 'white',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 0}
  }
});

export default MapScreen;
