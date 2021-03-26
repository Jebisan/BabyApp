import { Entypo } from '@expo/vector-icons';
import React from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';
import colors from '../constants/colors';


const City = props => {


  return (
    <View style = {styles.container}>
      <Entypo name="location-pin" size={24} color={colors.darkGrey} />
      <Text style= {styles.city}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    width: 330,
    
    /*
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid'
    */

  },
  city: {
    fontSize: 14,
    fontFamily: 'roboto-regular',
    paddingLeft: 20,
  },
});

export default City;
