import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView ,SafeAreaView, Image, TouchableOpacity} from 'react-native';

const GroupDetail = props => {


  return (
    <SafeAreaView style={styles.container}>
        <Text>GroupDetails</Text>
  </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#FFF",
      top: 10
      
  },
  profilePictureContainer: {
    alignSelf: "center" ,

},
  text: {
      fontFamily: "HelveticaNeue",
      fontWeight: '200',
      color: "#52575D",
      fontSize: 12,
       
      
  },
  image: {
      flex: 1,
      height: undefined,
      width: undefined
  },
  titleBar: {
      flexDirection: "row",
      justifyContent: 'flex-end',
      marginTop: 4,
      marginHorizontal: 20,

  },
  subText: {
      fontSize: 12,
      color: "#AEB5BC",
      textTransform: "uppercase",
      fontWeight: "500"
  },
  profileImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
      overflow: "hidden"
  },
  genderSymbol: {
    left: 7,
    bottom: 6,

  },
  dm: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: 20,
      width: 30,
      height: 30,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center"
  },
  active: {
      backgroundColor: "#34FFB9",
      position: "absolute",
      bottom: 28,
      left: 10,
      padding: 4,
      height: 20,
      width: 20,
      borderRadius: 10
  },
  add: {
      backgroundColor: "#41444B",
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 40,
      height: 40,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      
  },
  infoContainer: {
      alignSelf: "center",
      alignItems: "center",
      marginTop: 16,
      bottom: 2
  },
  statsContainer: {
      flexDirection: "row",
      alignSelf: "center",
      marginTop: 32,
      bottom: 2
  },
  statsBox: {
      alignItems: "center",
      flex: 1
  },
  mediaImageContainer: {
      width: 180,
      height: 200,
      borderRadius: 12,
      overflow: "hidden",
      marginHorizontal: 10
  },
  mediaCount: {
      backgroundColor: "#41444B",
      position: "absolute",
      top: "50%",
      marginTop: -50,
      marginLeft: 30,
      width: 100,
      height: 100,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 12,
      shadowColor: "rgba(0, 0, 0, 0.38)",
      shadowOffset: { width: 0, height: 10 },
      shadowRadius: 20,
      shadowOpacity: 1
  },
  recent: {
      marginLeft: 78,
      marginTop: 32,
      marginBottom: 6,
      fontSize: 10
  },
  recentItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 16
  },
  activityIndicator: {
      backgroundColor: "#CABFAB",
      padding: 4,
      height: 12,
      width: 12,
      borderRadius: 6,
      marginTop: 3,
      marginRight: 20
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 2,
    alignItems: 'center',
    width: 130,
    left: 20,
    //borderWidth: 1
  }, 
  infoSymbol: {
    right: 5,
    top: 1
  },
  infoText: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    fontWeight: '200',
    fontSize: 10,
    left: 8
  },
  weekNumber: {
    fontSize: 28,
    bottom: 9,

    fontFamily: "HelveticaNeue",
    fontWeight: '300',
    color: "#52575D",
  },
  weekText: {
    fontSize: 14,
    bottom: 11,

    fontFamily: "HelveticaNeue",
    fontWeight: '200',
    color: "#52575D",
  },
  weekSubtext: {
    fontSize: 8,
    bottom: 5,

    fontFamily: "HelveticaNeue",
    fontWeight: '200',
    color: "#52575D",
  },
  interestsTitle: {
    fontSize: 11,
    fontFamily: "HelveticaNeue",
    fontWeight: '300',
    color: "#52575D",
    right: 14
  },
  interestsContent: {
    fontSize: 10,
    top: 10,
    fontFamily: "HelveticaNeue",
    fontWeight: '200',
    color: "#52575D",
    marginHorizontal: 14
  },
});

export default GroupDetail;
