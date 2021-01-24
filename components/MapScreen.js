import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, {Marker}  from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../constants/colors';
import SelectedGroup from './SelectedGroup'
import { useSelector } from 'react-redux';

const MapScreen = props => {
  const [location, setLocation] = useState(props.location);
  const selectedGroup = useSelector(state => state.allGroups.selectedGroup)

  useEffect(() => {
    const found = props.allGroups.allGroups.find(group => group.selected);
  }, props.allGroups.allGroups)

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

  useEffect(() => {
    console.log('Group selected:', selectedGroup)
    console.log('All Groups:', props.allGroups.allGroups)
  }, [selectedGroup])

  return (
      <MapView style={styles.map} mapType={'mutedStandard'} region={location} >
      {props.allGroups.allGroups.map((group, index) => (
          <Marker key={group.key} coordinate={group.location} onPress={() => props.setSelectedGroupHandler(group.key)}>
          {group.selected?
            <View style={{...styles.group, ...styles.selectedGroupIcon}}>
            <FontAwesome name='group' size={14} color={'white'} 
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
        {
          <View style={{position: 'absolute', bottom: 50}}>
           {selectedGroup &&
             <SelectedGroup name={'Den seje mødregruppe'}/>
           }
          </View>
        }

      </MapView>
  )
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
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
  selectedGroupIcon: {
    borderWidth: 1,
    borderColor: 'white',
    borderStyle: 'solid',
    backgroundColor: Colors.primary,
  },
  selectedGroupPopup: {
    position: 'absolute', 
    width: '90%',
    top: '84%',
  }
});

export default MapScreen;
