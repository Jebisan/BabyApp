import { Entypo } from '@expo/vector-icons';
import React from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';
import colors from '../constants/colors';

type Props = {
  timestamp: Date;
  lastMessage: string;
  photoUrl: string;
  name: string;
  read: boolean
}

const City: React.FC<Props> = props => {


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
    paddingTop: 10,
    paddingBottom: 10,
    width: 330,
  },
  city: {
    fontSize: 14,
    fontFamily: 'roboto-regular',
    paddingLeft: 16,
  },
});

export default City;
