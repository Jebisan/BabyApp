import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../constants/colors';
const MapScreen = props => {

  const [location, setLocation] = useState(props.location);

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


  return (
      <MapView style={styles.map} mapType={'mutedStandard'} region={location} >
      {props.allGroups.map((group, index) => (
          <Marker key={group.key} coordinate={group.location} onPress={() => props.setSelectedGroupHandler(group.key)}>
          {group.selected?
            <View style={styles.groupSelected}>
            <FontAwesome name='group' size={14} color={Colors.primary} 
            />
            </View>
            : 
            <View style={styles.group}>
            <FontAwesome name='group' size={14} color={Colors.primary} 
            />
            </View>
          }

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
  },
  groupSelected: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 25, 
    height: 25, 
    borderRadius: 50, 
    backgroundColor: 'white',
    shadowOpacity: 0.4,
    shadowRadius: 2,
    shadowOffset: {width: 0, height: 0},
    borderWidth: 1,
    borderColor: 'red',
    borderStyle: 'solid'
  }
});

export default MapScreen;
