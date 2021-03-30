import React from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';

const UserAutocomplete = props => {


  
  return (
      <View style = {styles.container}>
        <Image style={styles.image} source={ props.photoUrl?{uri: props.photoUrl }: {uri: 'http://criticare.isccm.org/assets/images/male_placeholder.png' }} />
        <Text style= {styles.titleText}>{props.firstname + ' ' + props.lastname}</Text>
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
    borderRadius: 15,
  }
});

export default UserAutocomplete;
