import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native'
import MapView from './MapView/MapView'
import ListView from './ListView/ListView'
import Colors from '../../constants/colors'
import { MaterialIcons, FontAwesome } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowMap } from '../../store/actions/find'

const Find = (props) => {
	const dispatch = useDispatch()
	const allGroups = useSelector(state => state.allGroups.allGroups)
	const selectedGroup = allGroups.find(group => group.selected === true) 
	const showMap = useSelector(state => state.find.showMap)
	const showViewChangerButton = useSelector(state => state.find.showViewChangerButton)

	useEffect(() => {
		console.log(showViewChangerButton);
	}, [showViewChangerButton])

	return (
		<View style= {styles.parentContainer} >
		{
			showViewChangerButton &&
			<View style={styles.front}>
			{!selectedGroup && 
				<TouchableOpacity style={styles.buttonContainer} onPress={() => dispatch(toggleShowMap())} >
				{ showMap
					? 
					<MaterialIcons name="list" size={25} color={Colors.lightGrey} /> 
					:
					<FontAwesome name="map-o"  size={16} color={Colors.lightGrey} />
				} 
				<Text style={styles.buttonTitleStyle}>{showMap?' Liste':'  Kort'}</Text>
				</TouchableOpacity>
			}
			</View>
		}
			<View style={styles.back} >
				{showMap ? <MapView navigation= {props.navigation} /> : <ListView navigation= {props.navigation} />} 
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
		width: '100%',
		height: '100%',  
		zIndex: 0
	},
	buttonContainer:{
		top: 645,
		left: 255,
		width: 90,
		height: 40,
		borderRadius: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.primary,
		shadowRadius: 6,
		shadowOpacity: 0.3,
		shadowOffset: { width: 6, height: 6 },
	},
	buttonTitleStyle: {
		fontSize: 15,
		color: Colors.lightGrey,
		fontFamily: 'roboto-bold',
	}
})

export default Find