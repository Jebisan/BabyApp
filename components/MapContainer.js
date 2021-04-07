import React, { useEffect, useState } from 'react';
import {View, Alert, StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import MapScreen from './MapScreen';
import { useSelector, useDispatch } from 'react-redux';
import {setSelectedGroup} from '../store/actions/allGroups'

const MapContainer = props => {
  const allGroups = useSelector(state => state.allGroups.allGroups);
  const myGroups = useSelector(state => state.myGroups);
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(defaultLocation);
  const dispatch = useDispatch();

  //Denmark. Should be refactored to current location.
  const defaultLocation = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };


  useEffect(() => {
   getLocationHandler(props.coordinates);
  }, [props.coordinates])

  const getLocationHandler = async (coordinates) => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      setPickedLocation(coordinates)
      setIsFetching(true);
    } catch (err) {
      Alert.alert(
        'Could not fetch location!',
        'Please try again later or pick a location on the map.',
        [{ text: 'Okay' }]
      );
    }
    setIsFetching(false);
  };

  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.LOCATION);
    if (result.status !== 'granted') {
      Alert.alert(
        'Insufficient permissions!',
        'You need to grant location permissions to use this app.',
        [{ text: 'Okay' }]
      );
      return false;
    }
    return true;
  };

  const setSelectedGroupHandler = (key) => {
    dispatch(setSelectedGroup(key))
  }


  return (
    <View style={styles.locationPicker}>
      <MapScreen  
        location={pickedLocation}
        allGroups = {allGroups}
        navigation={props.navigation}
        setSelectedGroupHandler={(group) => setSelectedGroupHandler(group)}
    />
    </View>
  );
};

const styles = StyleSheet.create({
  locationPicker: {
    flex: 1,
  },
});

export default MapContainer;
