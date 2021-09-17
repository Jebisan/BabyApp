import React, {useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {View, StyleSheet, Text, TextInput, TouchableOpacity, Animated, FlatList } from 'react-native'
import { Entypo, MaterialCommunityIcons } from '@expo/vector-icons' 
import colors from '../constants/colors'
import {screenHeight} from '../constants/sizes'
import Slider from '@react-native-community/slider';


const FilterModal = props => {
	const slideFromBottom = useRef(new Animated.Value(screenHeight)).current
	const backgroundOpacity= useRef(new Animated.Value(0)).current
	const dispatch = useDispatch()
	const filter = useSelector(state => state.allGroups.filter)

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

	hideFilter = () => {
		Animated.spring(
			slideFromBottom,
			{
				toValue: screenHeight,
				tension: 10,
				useNativeDriver: true
			}
		).start()

		Animated.spring(
			backgroundOpacity,
			{
				toValue: 0,
				tension: 10,
				useNativeDriver: true
			}
		).start()
		setTimeout(() => {
			props.setShowFilter(false);
		}, 500)
	}

	const groupTypesOnChangeHandler = (type) => {
			const newList = filter.groupTypes.map(groupType => {
				if (groupType.type === type) {
					return {
						...groupType, selected: !groupType.selected,
					};
				} else {
					return {
						...groupType
					};
				}
			});
			dispatch({ type: 'FILTER_UPDATED', filter: {...filter, groupTypes: newList} })
	}

	const experiencesOnChangeHandler = (type) => {
		const newList = filter.experiences.map(experience => {
			if (experience.type === type) {
				return {
					...experience, selected: !experience.selected,
				};
			} else {
				return {
					...experience
				};
			}
		});
		dispatch({ type: 'FILTER_UPDATED', filter: {...filter, experiences: newList} })		
	}

	
	return (
		<View style = {styles.parent}>
			<Animated.View style={{...styles.background, opacity: backgroundOpacity}}></Animated.View>
			<Animated.View style={[styles.modalContainer, {transform: [{translateY: slideFromBottom }]}]}>
				<View style={styles.topContainer}>
					<Entypo name="cross" style={styles.cross} size={24} color="black" onPress={() => hideFilter()} />
					<Text style={styles.title}>Filtre</Text>
				</View>
				<View style={styles.contentContainer}>

				<View style={styles.filterContainer}>
				<Text style={styles.filterHeader}>Gruppetype</Text>

					<FlatList
					horizontal={true}
					keyExtractor={item => item.name}
					data={filter.groupTypes}
					renderItem={({ item }) =>
							<TouchableOpacity style={item.selected?styles.buttonSelected:styles.button} onPress={() => groupTypesOnChangeHandler(item.type)} >
								<Text style={item.selected?styles.buttonTextSelected:styles.buttonText}>{item.name}</Text>
							</TouchableOpacity>
					}
					/>
				</View>

				<View style={styles.filterContainer}>
				<Text style={styles.filterHeader}>Fødselserfaring</Text>

					<FlatList
					horizontal={true}
					keyExtractor={item => item.name}
					data={filter.experiences}
					renderItem={({ item }) =>
							<TouchableOpacity style={item.selected?styles.buttonSelected:styles.button} onPress={() => experiencesOnChangeHandler(item.type)} >
								<Text style={item.selected?styles.buttonTextSelected:styles.buttonText}>{item.name}</Text>
							</TouchableOpacity>
					}
					/>
				</View>
				
					<View style={styles.filterContainer}>
						<Text style={styles.filterHeader}>Terminsmargin</Text>
						<View style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
							
						<View style={styles.marginValue} >
						<MaterialCommunityIcons name="plus-minus" size={16} color={colors.darkGrey} />
						<Text style={{fontSize: 13, fontFamily: 'roboto-bold', color:colors.darkGrey}} >{filter.margin} uger</Text>
						</View>
							<Slider
								value={filter.margin}
								step={1}
								onValueChange={value => dispatch({ type: 'FILTER_UPDATED', filter: {...filter, margin: value }})}
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
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		borderRadius: 20,
		backgroundColor: colors.lightBlue,
		marginLeft: 10
	},
	button: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		borderRadius: 20,
		backgroundColor: colors.white,
		marginLeft: 10,
		borderWidth: 0.3,
		borderColor: colors.darkGrey,
		borderStyle: 'solid',
		paddingHorizontal: 15
	},
	buttonText: {
		color: colors.darkGrey,
		fontFamily: 'roboto-regular'
	},
	buttonSelected: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		height: 30,
		borderRadius: 20,
		backgroundColor: colors.lightBlue,
		marginLeft: 10,
		color: colors.white,
		paddingHorizontal: 15
	},
	buttonTextSelected: {
		color: colors.white,
		fontFamily: 'roboto-regular'
	}

})

export default FilterModal
