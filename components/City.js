import React from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';


const City = props => {


  return (
    <View style = {styles.parent}>
      <Text style= {styles.titleText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  } ,
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  descriptionText: {
    fontSize: 18,
  },
  wishContainer: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 90,
    width: 350,
  },
  horizontalContainer: {
    flexDirection: 'row'
  },
  verticalContainer: {
    flexDirection: 'column',
    padding: 7, 
  }
});

export default City;
