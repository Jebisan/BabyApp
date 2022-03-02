import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';
import colors from '../constants/colors';
import { UserType } from '../types';

const User:React.FC<UserType> = props => {

  return (
    <View style = {styles.parent}>
      <View style={styles.horizontalContainer}>
        <View style={styles.imageContainer} >
          <Image style={styles.image} source={ props.photoUrl?{uri: props.photoUrl }: {uri: 'http://criticare.isccm.org/assets/images/male_placeholder.png' }} />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.titleText}>{props.firstname + ' ' + props.lastname}</Text>
          <View style={styles.subInfoContainer} >
            <Entypo style={{right: 5, bottom: 4}} name="location-pin" size={20} color={colors.darkGrey} />
            <Text style={styles.descriptionText}>{props.city}</Text>
            <MaterialCommunityIcons style={{left: 7, bottom: 3}} name="baby-face-outline" size={20} color={colors.darkGrey} />
            <Text style={{...styles.descriptionText, left: 10}}>2</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderColor: colors.mediumGrey,
    borderStyle: 'solid',
    borderBottomWidth: 0.5,
    paddingVertical: 3
  },
  horizontalContainer: {
    width: 330,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 0,
    borderColor: 'blue',
    borderStyle: 'solid',
  },
  titleText: {
    fontSize: 17,
    fontFamily: 'roboto-medium'
  },
  descriptionText: {
    fontSize: 12,
    fontFamily: 'roboto-regular',
    color: colors.darkGrey,
    right: 5
  },

  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: 'red',
    padding: 8,
    paddingTop: 18
  },
  image: {
    width: 75,
    height: 75, 
    borderRadius: 50
  },
  imageContainer: {
    padding: 10,
    shadowRadius: 8,
    shadowOpacity: 0.15,
    shadowOffset: {
      height: 6,
      width: 0
    },
    borderStyle: 'solid',
    borderWidth: 0,
    borderColor: 'green'
  },
  subInfoContainer: {
    flexDirection: 'row',
    marginTop: 7
  }
});

export default User;
