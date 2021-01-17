import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity} from "react-native";
import MapView from './MapView/MapView';
import ListView from './ListView/ListView';
import Colors from '../../constants/colors';
import { MaterialIcons } from "@expo/vector-icons";



const Find = (props) => {

const [showMapView, setShowMapView] = useState(true);


  return (
    <View style= {styles.parentContainer} >
    <View style={styles.front}>
    <TouchableOpacity style={styles.buttonContainer} onPress={() => setShowMapView(() => !showMapView)} >
      <MaterialIcons name="list" size={24} color={Colors.lightGrey} />
      <Text style={styles.buttonTitleStyle} >Liste</Text>
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
  top: '90%',
  left:'75%',
  flex: 1,
  zIndex: 1,
},
back: {
  flex: 1,
  zIndex: 0
},
buttonContainer:{
  width: 70,
  height: 33,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.primary,
  borderRadius: 16,
  shadowRadius: 4,
  shadowOpacity: 0.20,
  shadowOffset: { width: 7, height: 7 },
},
buttonTitleStyle: {
  fontSize: 12,
  fontWeight: 'bold',
  color: Colors.lightGrey,
  fontFamily: 'roboto-medium'
}
});

export default Find;

