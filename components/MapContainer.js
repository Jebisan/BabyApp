import React, { useEffect, useState } from 'react';
import {
  View,
  Button,
  Text,
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapScreen from './MapScreen';

const MapContainer = props => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(props.location);

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

  return (
    <View style={styles.locationPicker}>
      <MapScreen  
    location={pickedLocation}
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
