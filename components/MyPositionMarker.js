import React from 'react';
import {View, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

const MyPostionMarker = props => {

  return (
    <View style={styles.parent} >
      <View style={styles.container}></View>
      <View style={styles.myPositionDot}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.lightBlue,
    borderWidth: 1,
    borderRadius: 40,
    width: 80,
    height: 80,
  },
  container: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.normalBlue,
    opacity: 0.10
  },
  myPositionDot: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 20,
    height: 20,
    borderWidth: 3,
    borderColor: Colors.white,
    backgroundColor: Colors.lightBlue,
    borderRadius: 10,
      }
});

export default MyPostionMarker;
