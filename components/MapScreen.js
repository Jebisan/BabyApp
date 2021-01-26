import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, {Marker}  from 'react-native-maps';
import { FontAwesome } from '@expo/vector-icons'
import Colors from '../constants/colors';
import SelectedGroup from './SelectedGroup'
import { useSelector } from 'react-redux';

const MapScreen = props => {
  const [location, setLocation] = useState(props.location);
  const allGroups = useSelector(state => state.allGroups.allGroups)
  const selectedGroup = allGroups.find(group => group.selected === true); 



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
          <View style={styles.selectedGroupContainer} > 
            {selectedGroup 
              &&
              <TouchableOpacity onPress={() => props.navigation.navigate('GroupDetail', {})}>
                <SelectedGroup group={selectedGroup}/>
              </TouchableOpacity> 
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
    borderWidth: 2,
    borderColor: 'white',
    borderStyle: 'solid',
    backgroundColor: Colors.primary,
  },
  selectedGroupContainer: {
    position: 'absolute',
    bottom: 30
  }
});

export default MapScreen;
