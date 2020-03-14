import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

const Settings = props => {


  return (
    <View style = {styles.parent}>
      <Text style= {styles.headerText}>Settings!</Text>
    </View>

  );
};

export default Settings;

Settings.navigationOptions = navigationData => {
  return {
    headerTitle: 'Settings',
    headerLeft:  <Ionicons name="md-menu" size={22}  onPress={() => navigationData.navigation.openDrawer()} />,
  };
};


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