import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import HeaderButton from '../../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

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
    headerLeft:  

    <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      title="drawer"
      iconName= 'md-menu'
      onPress={() => navigationData.navigation.openDrawer()}
    />
  </HeaderButtons>,
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