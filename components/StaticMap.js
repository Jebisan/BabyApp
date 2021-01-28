import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import ENV from '../env';

const StaticMap = props => {
  let imagePreviewUrl;

  if (props.location) {
    imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      props.location.latitude
    },${
      props.location.longitude
    }&zoom=14&size=1600x800&maptype=roadmap&markers=icon:http://www.dj-resound.com/icon2.png%7C${
      props.location.latitude
    },${props.location.longitude}&key=${ENV.googleApiKey}`;
  }

  return (
    <View style={{ ...styles.mapPreview, ...props.style }}>
      {props.location ? 
        <Image style={styles.mapImage} source={{ uri: imagePreviewUrl }} />
       : 
        <Text>No map</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  mapPreview: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapImage: {
    width: '100%',
    height: '100%'
  }
});

export default StaticMap;
