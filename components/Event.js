import React, { useEffect } from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';
import colors from '../constants/colors';
import { screenWidth } from '../constants/sizes';
import { convertTimestamp, timestampToTime, timestampToMonth, timestampToShortMonth, timestampToDateNumber } from '../shared/generic'
import {Ionicons, Entypo, FontAwesome} from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps'

const Event = props => {

  const location = {
    latitude: props.latitude,
    longitude: props.longitude,
    latitudeDelta: 0.0122, 
    longitudeDelta: 0.0121
  }
  return (
    <View style = {styles.parent}>
      <View style={styles.horizontalContainer}>
        <View style={styles.imageContainer} >
          <Image style={styles.image} source={ props.userPhotoUrl?{uri: props.userPhotoUrl }: {uri: 'http://criticare.isccm.org/assets/images/male_placeholder.png' }} />
        </View>
        <View style={styles.subInfoContainer}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.createdAtText}>For {convertTimestamp(props.createdAt)}</Text>
        </View>
      </View>

      <View style={{width: "100%"}} >
        <Text style={styles.text} >{props.text}</Text>
        <View style={styles.eventContainer} >
          <View style={styles.eventTopContainer} >
            <View style={styles.dateContainer} >
              <Text style={styles.month} >{timestampToShortMonth(props.startTime)}</Text>
              <Text style={styles.dateNumber} >{timestampToDateNumber(props.startTime)}</Text>
            </View>
            <View style={styles.eventInfoContainer} >
              <Text style={styles.eventTitle}>{props.title}</Text>
              <View style={styles.timeRow}>
                <Ionicons style={{opacity:0.3}} name="ios-time" size={16} color={colors.black} />
                <Text style={styles.timeText}>{timestampToTime(props.startTime)} - {timestampToTime(props.endTime)}</Text>
              </View>
              <View style={styles.addressRow}>
                <Entypo name="location-pin" style={{right: 3, opacity: 0.3}} size={19} color={colors.black} />
                <Text style={styles.addressText}>{props.address}, {props.postalCode} {props.city}</Text>
              </View>
          </View>
          </View>
          <View style={styles.mapContainer} >
          <MapView style={styles.mapPreview} mapType={'mutedStandard'} region={location} >
          <Marker coordinate={location}>
            <Entypo name="location-pin" size={30} color={colors.lightBlue} />
          </Marker>
        </MapView>
          </View>

        </View>
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
    minHeight: 200,
    borderRadius: 20,
    width: screenWidth-20,
    paddingBottom: 30,
    height: 370
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
  createdAtText: {
    fontSize: 12,
    fontFamily: 'roboto-regular',
    color: colors.darkGrey,
    top: 2
  },
  text: {
    fontSize: 16,
    fontFamily: 'roboto-regular',
    marginLeft: 14,
    marginBottom: 18,
  },
  horizontalContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  eventContainer: {
    width: "100%",
    height: 150, // Should be removed
    borderRadius: 20,
    backgroundColor: colors.secondaryShade1
  },
  dateContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 60,
    backgroundColor: colors.lightestBlue,
    borderRadius: 16,
    shadowRadius: 2,
    shadowOpacity: 0.1,
    shadowOffset: {
      height: 2,
      width: 1
    },
    margin: 10,
  },
  month: {
    fontSize: 16,
    fontFamily: 'roboto-medium',
    color: colors.white,
    margin: -2
  },
    dateNumber: {
    fontSize: 26,
    fontFamily: 'roboto-medium',
    color: colors.black,
    margin: -2
  },
  eventTopContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  eventInfoContainer: {
    flexDirection: 'column',
    margin: 10,
    bottom: 1 
  },
  eventTitle: {
    fontSize: 14,
    fontFamily: 'roboto-medium',
    color: colors.black,
    marginVertical: 3,
    right: 1
  },
  timeText: {
    fontSize: 12,
    fontFamily: 'roboto-regular',
    marginVertical: 2,
    marginHorizontal: 7
  },
  addressText: {
    fontSize: 12,
    fontFamily: 'roboto-regular',
    marginVertical: 2,
    marginHorizontal: 1
  },
  mapContainer: {
    shadowRadius: 6,
    shadowOpacity: 0.18,
    shadowOffset: {
      height: 3,
      width: 0
    },
  },
  mapPreview: {
		width: '100%',
		height: 150,
    borderRadius: 20,
	}
});

export default Event;
