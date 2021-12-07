import React, { useEffect } from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';
import colors from '../constants/colors';
import { screenWidth } from '../constants/sizes';
import { convertTimestamp } from '../shared/generic'

const Post = props => {
  return (
    <View style = {styles.parent}>
      <View style={styles.horizontalContainer}>
        <View style={styles.imageContainer} >
          <Image style={styles.image} source={ props.userPhotoUrl?{uri: props.userPhotoUrl }: {uri: 'http://criticare.isccm.org/assets/images/male_placeholder.png' }} />
        </View>
        <View style={styles.subInfoContainer}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.timeText}>For {convertTimestamp(props.createdAt)}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.text} >{props.text}</Text>
        { props.photoUrl && 
          <View style={styles.postImageContainer} > 
            <Image source={{uri: props.photoUrl}} style={styles.postImage}  resizeMode={'cover'} borderRadius={20} ></Image>
          </View>
        }
      </View>
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
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    minHeight: 120,
    borderRadius: 20,
    width: screenWidth-20,
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
    marginBottom: 28,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  subInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderStyle: 'solid',
  },
  postImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 400,
  },
  postImage: {
    width: '100%',
    height: '100%',
    marginBottom: 20,
  }
});

export default Post;
