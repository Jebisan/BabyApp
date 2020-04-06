import React from 'react';
import {View, StyleSheet, Text } from 'react-native';


const HomeScreen = props => {

  return (
    <View style = {styles.parent}>
    <Text style = {styles.headerText}>Velkommen tilbage!</Text>
    </View>
  );
};

HomeScreen.navigationOptions = navigationData => {

  return {
    headerTitle: 'Hjem',
  };
};

const styles = StyleSheet.create({
  parent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 100
  } ,
  headerText: {
    fontSize: 26,
    fontWeight: "bold"
  },
});

export default HomeScreen;
