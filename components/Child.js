import React from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';

const Child = props => {


  
  return (
    <View style = {styles.parent}>

      <View style={styles.verticalContainer}>
        <View style={styles.imageContainer}>
          <Image style={{width: 50, height: 50, borderRadius: 400/ 2}} source={ props.photoUrl?{uri: props.photoUrl }: {uri: 'http://criticare.isccm.org/assets/images/male_placeholder.png' }} />
        </View>
      <Text style= {styles.titleText}>{props.firstname}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    paddingTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    height: 100
  } ,
  titleText: {
    fontSize: 10,
    fontWeight: 'normal'
  },
  descriptionText: {
    fontSize: 14,
    color: 'grey',
    paddingTop: 3,
    paddingLeft: 1,
  },
  horizontalContainer: {
    flexDirection: 'row'
  },
  verticalContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 310,
    bottom: 35,
    height: 20,
    width: 20,

  },
  imageContainer: {
    paddingBottom: 10
  }
});

export default Child;
