import React from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';


const GroupAutocomplete = props => {

  return (
      <View style = {styles.container}>
        <Image style={styles.image} source={{uri: props.photoUrl }} />
        <Text style= {styles.titleText}>{props.name}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 7,
    width: 330,
  },
  titleText: {
    fontSize: 14,
    fontFamily: 'roboto-regular',
    paddingLeft: 17
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 10,
  }
});

export default GroupAutocomplete;
