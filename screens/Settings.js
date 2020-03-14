import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';

const Settings = props => {


  return (
    <View style = {styles.parent}>
      <Text style= {styles.headerText}>Settings!</Text>
    </View>

  );
};

export default Settings;



const styles = StyleSheet.create({
  parent: {
    paddingTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
  } ,
  headerText: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 20,

  }
})