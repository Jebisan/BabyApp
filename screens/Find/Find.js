import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import MapView from './MapView/MapView';
import ListView from './ListView/ListView';
import Colors from '../../constants/colors';
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

const Find = (props) => {

const [showMapView, setShowMapView] = useState(true);


  return (
    <View style= {styles.parentContainer} >
      <View style={styles.front}>
      <TouchableOpacity style={styles.buttonContainer} onPress={() => setShowMapView(() => !showMapView)} >
      { showMapView? 
        <MaterialIcons name="list" size={23} color={Colors.lightGrey} /> :
        <FontAwesome name="map-o"  size={14} color={Colors.lightGrey} />
        } 
        <Text style={styles.buttonTitleStyle}>{showMapView?" Liste":"  Kort"}</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.back} >
        {showMapView ? <MapView/> : <ListView/>} 
      </View>
    </View>
      )
}

const styles = StyleSheet.create({
parentContainer: {
  flex: 1,
  },
front: {
  position: 'absolute',
  zIndex: 1,
},
back: {
  width: "100%",
  height: "100%",  
  zIndex: 0
},
buttonContainer:{
  top: 665,
  left: 280,
  width: 70,
  height: 33,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.primary,
  borderRadius: 16,
  shadowRadius: 6,
  shadowOpacity: 0.25,
  shadowOffset: { width: 5, height: 5 },
},
buttonTitleStyle: {
  fontSize: 12,
  color: Colors.lightGrey,
  fontFamily: 'roboto-bold',
}
});

export default Find;

