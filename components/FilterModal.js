import React, { useState, useRef, useEffect } from 'react'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Animated, Keyboard } from 'react-native'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons' 
import colors from '../constants/colors'
import {screenHeight} from '../constants/sizes'
import {ButtonGroup} from 'react-native-elements'
import Slider from '@react-native-community/slider';

const FilterModal = props => {
	const slideFromBottom = useRef(new Animated.Value(screenHeight)).current
	const backgroundOpacity= useRef(new Animated.Value(0)).current
	const [groupTypes, setGroupTypes] = useState([0])
	const [experiences, setExperiences] = useState([0])
	const [margin, setMargin] = useState(4)


	useEffect(() => {
		Animated.spring(
			slideFromBottom,
			{
				toValue: 0,
				tension: 10,
				useNativeDriver: true
			}
		).start()
	}, [slideFromBottom])


	useEffect(() => {
		Animated.spring(
			backgroundOpacity,
			{
				toValue: 0.7,
				tension: 10,
				useNativeDriver: true
			}
		).start()
	}, [backgroundOpacity])


	
	return (
		<View style = {styles.parent}>
			<Animated.View style={{...styles.background, opacity: backgroundOpacity}}></Animated.View>
			<Animated.View style={[styles.modalContainer, {transform: [{translateY: slideFromBottom }]}]}>
				<View style={styles.topContainer}>
					<Entypo name="cross" style={styles.cross} size={24} color="black" onPress={() => props.setShowFilter(false)} />
					<Text style={styles.title}>Filtre</Text>
				</View>
				<View style={styles.contentContainer} >
					<View style={styles.filterContainer}>
						<Text style={styles.filterHeader} >Gruppetype</Text>
						<ButtonGroup
						selectedIndexes={groupTypes}
						onPress={index => setGroupTypes(index)}
						buttons={[ <Text>Mødregrupper</Text>, <Text>Familiegrupper</Text>]}
						selectMultiple
						buttonStyle={{borderRadius:200, borderWidth: 1, borderColor:colors.mediumGrey, marginHorizontal: 5}}
						selectedButtonStyle={{borderRadius:200, borderWidth: 1, borderColor:colors.mediumGrey, backgroundColor: colors.lightBlue}}
						innerBorderStyle={{width: 0}}
						containerStyle={{borderWidth: 0, backgroundColor: colors.lightGrey}}
						/>
					</View>
					<View style={styles.filterContainer}>
						<Text style={styles.filterHeader} >Fødselserfaring</Text>
						<ButtonGroup
						selectedIndexes={experiences}
						onPress={index => setExperiences(index)}
						buttons={[ <Text>1. fødsel</Text> , <Text>2. fødsel</Text>,<Text>3+</Text>]}
						selectMultiple={true}
						buttonStyle={{borderRadius:200, borderWidth: 1, borderColor:colors.mediumGrey, marginHorizontal: 5}}
						selectedButtonStyle={{borderRadius:200, borderWidth: 1, borderColor:colors.mediumGrey, backgroundColor: colors.lightBlue}}
						innerBorderStyle={{width: 0}}
						containerStyle={{borderWidth: 0, backgroundColor: colors.lightGrey}}
						/>
					</View>
					<View style={styles.filterContainer}>
					<Text style={styles.filterHeader}>Terminsmargin</Text>
					<View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
						
					<View style={styles.marginValue} >
					<MaterialCommunityIcons name="plus-minus" size={16} color={colors.darkGrey} />
					<Text style={{fontSize: 13, fontFamily: 'roboto-bold', color:colors.darkGrey}} >{margin} uger</Text>
					</View>
						<Slider
							value={margin}
							step={1}
							onValueChange={value => setMargin(value)}
							style={{width: 300, height: 40}}
							minimumValue={1}
							maximumValue={8}
							minimumTrackTintColor={colors.lightBlue}
							maximumTrackTintColor={colors.mediumGrey}
						/>
				  </View>
				</View>
				</View>
			</Animated.View>
		</View>
	)
}

const styles = StyleSheet.create({
	parent: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 5,
		bottom: 0,
	},
	background: {
		position: 'absolute',
		backgroundColor: 'black',
		width: '100%',
		height: '100%',
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
		width: '100%',
		height: '50%',
		zIndex: 3,
		bottom: 0,
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
	contentContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		height: '100%',
		paddingTop: 20
	},
	filterContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
		width: 320,
		height: 100,
		borderWidth: 0,
		borderColor: 'red',
		borderStyle: 'solid'
	},
	filterHeader: {
		fontFamily: 'roboto-medium',
		marginLeft: 20,
		marginBottom: 5
	},
	marginValue:{
		flexDirection: 'row',
		position:'absolute',
		right:0,
		bottom: 20,
		padding: 10,
	}

})

export default FilterModal
