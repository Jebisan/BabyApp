import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';
import colors from '../constants/colors';
import { convertTimestamp } from '../shared/generic'

const Post = props => {

  useEffect(() => {
    // console.log(props
  }, [props])

  return (
    <View style = {styles.parent}>
      <View style={styles.horizontalContainer}>
        <View style={styles.imageContainer} >
          <Image style={styles.image} source={ props.photoUrl?{uri: props.photoUrl }: {uri: 'http://criticare.isccm.org/assets/images/male_placeholder.png' }} />
        </View>
        <View style={styles.subInfoContainer}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.timeText}>{convertTimestamp(props.createdAt)}</Text>
        </View>
      </View>
      <Text style={styles.text} >{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    marginTop: 20,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    minHeight: 200
  },
  image: {
    width: 50,
    height: 50, 
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
  name: {
    fontSize: 14,
    fontFamily: 'roboto-medium'
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'roboto-regular',
    color: colors.darkGrey,
    top: 2
  },
  text: {
    fontSize: 16,
    fontFamily: 'roboto-regular',
    marginLeft: 14,
    marginTop: 8
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
  subInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderStyle: 'solid',
  }
});

export default Post;
