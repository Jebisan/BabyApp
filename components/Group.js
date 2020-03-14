import React from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';
import {Ionicons} from '@expo/vector-icons';



const Group = props => {


  
  return (
    <View style = {styles.parent}>
      <View style = {styles.wishContainer}>

      <View style={styles.horizontalContainer}>
      <View style={styles.verticalContainer}>
        <View style={styles.imageContainer}>
          <Image style={{width: 50, height: 50, borderRadius: 400/ 2}} source={{uri: props.photoUrl }} />
      </View>
    <View style={styles.icon}>
    <Ionicons name="ios-arrow-forward" size={20} color="lightgrey" />
    </View>
      </View>

      <View style={styles.verticalContainer}>
        <Text style= {styles.titleText}>{props.name}</Text>
        <Text style= {styles.descriptionText}>{props.description}</Text>
        <Text style= {styles.descriptionText2}>{props.postalCode} {props.city}</Text>
      </View>
      </View>
      </View>
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
    fontWeight: "normal"
  },
  descriptionText: {
    fontSize: 14,
    color: 'grey',
    paddingTop: 3,
    paddingLeft: 1,
    fontStyle:'italic'
  },
  descriptionText2: {
    fontSize: 14,
    color: 'grey',
    paddingTop: 3,
    paddingLeft: 1,
  },
  wishContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    height: 90,
    width: 350,
  },
  horizontalContainer: {
    flexDirection: 'row'
  },
  verticalContainer: {
    flexDirection: 'column',
    padding: 7, 
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
    borderRadius: 400/ 2,
    borderWidth: 1,
    borderColor: 'lightgrey'
  }
});

export default Group;
