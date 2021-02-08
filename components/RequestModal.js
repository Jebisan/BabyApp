import React, { useState, useRef, useEffect } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Entypo } from '@expo/vector-icons'; 
import colors from '../constants/colors'
import {screenHeight} from '../constants/sizes'

const RequestModal = props => {

  const [text, setText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae interdum arcu. Sed sed dignissim nulla, quis iaculis nisl. Mauris vel ex nisi. Sed porta erat nec ex euismod, eu commodo justo vestibulum. ')
  const backgroundOpacity = useRef(new Animated.Value(screenHeight)).current
  const slideFromBottom= useRef(new Animated.Value(0)).current


  useEffect(() => {
    Animated.spring(
      backgroundOpacity,
      {
        toValue: 0,
        tension: 10,
        useNativeDriver: true
      }
    ).start();
  }, [backgroundOpacity])


  useEffect(() => {
    Animated.spring(
      slideFromBottom,
      {
        toValue: 0.7,
        tension: 10,
        useNativeDriver: true
      }
    ).start();
  }, [slideFromBottom])


  
  return (
    <View style = {styles.parent}>
      <Animated.View style={{...styles.background, opacity: slideFromBottom}}></Animated.View>
      <Animated.View style={[styles.modalContainer, {transform: [{translateY: backgroundOpacity}]}]}>
        <View style={styles.topContainer}>
          <Entypo name="cross" style={styles.cross} size={24} color="black" onPress={props.toggleModal} />
          <Text style={styles.title}>Anmod</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>Besked</Text>
            <View style={styles.textAreaContainer} >
              <TextInput 
              style={styles.textArea} 
              value={text} 
              onChangeText={text => setText(text)} 
              multiline
              numberOfLines={4}
              />
            </View>
          </View>
          <View style={styles.buttonContainer} >
            <TouchableOpacity style={styles.modalRequestButton} onPress={() => Alert.alert('Not supported yet')} > 
            <Text style={styles.buttonText}>Send anmodning</Text>
          </TouchableOpacity>
          </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    width: "100%",
    height: "100%",
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
  },
  background: {
    position: 'absolute',
    backgroundColor: 'black',
    width: '100%',
    height: "100%",
    zIndex: 2,
    opacity: 0.4
  },
  modalContainer: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.lightGrey,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: "100%",
    height: "92%",
    zIndex: 3,
    bottom: 0
  },
  title: {
    fontFamily: 'roboto-bold',
    fontSize: 16,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: 30
  },
  cross: {
    position: 'absolute',
    left: 20,
    top: 30
  },
  subTitle: {
    fontFamily: 'roboto-medium',
    marginTop: 40
  },
  textAreaContainer: {
    width: 330,
    height: 200,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.mediumGrey,
    top: 10,
		shadowRadius: 10,
		shadowOpacity: 0.12,
		shadowOffset: {
			height: 2, 
			width: 0
		},
    backgroundColor: 'white'
  },
  textArea: {
    padding: 15,
    paddingTop: 15
  },
  modalRequestButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		backgroundColor: 'white',
		width: 340,
		height: 40,
		backgroundColor: colors.primary,
		borderRadius: 6,
		shadowRadius: 8,
		shadowColor: 'black',
		shadowOpacity: 0.16,
		shadowOffset: {
			height: 8, 
			width: 0
		},
	},
  buttonText: {
		color: 'white',
		fontFamily: 'roboto-medium'
	},
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		width: 300,
		height: 50,  
	},

});

export default RequestModal;
