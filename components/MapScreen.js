import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import MapView, {Marker}  from 'react-native-maps'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import Colors from '../constants/colors'
import SelectedGroup from './SelectedGroup'
import MyPositionMarker from './MyPositionMarker'
import { useDispatch, useSelector } from 'react-redux'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location'
import {clearSelectedGroup, setSelectedGroup} from '../store/actions/allGroups'

const MapScreen = props => {
	const allGroups = useSelector(state => state.allGroups.allGroups)
	const dispatch = useDispatch()

	const defaultLocation = {
		latitude: 55.898147, 
		longitude: 10.429636, 
		latitudeDelta: 5.387598, 
		longitudeDelta: 5.227751
	}

	const [loading, setLoading] = useState(false)
	const [showUserLocation, setShowUserLocation] = useState(false)
	const selectedGroup = allGroups.find(group => group.selected === true) 


	useEffect(() => {
		if(getLocationPermission()) {
			console.log('Got permission!')
		} else {
			console.log('ERROR')
		}
	}, [])

	const getLocationPermission = async () => {
		try {
			const hasPermission = await verifyPermissions()
			if (!hasPermission) {
				return true
			}} catch (err) {
			Alert.alert(
				'Could not fetch location!',
				'Please try again later or pick a location on the map.',
				[{ text: 'Okay' }]
			)
		}
	}

	const verifyPermissions = async () => {
		const result = await Permissions.askAsync(Permissions.LOCATION)
		if (result.status !== 'granted') {
			Alert.alert(
				'Insufficient permissions!',
				'You need to grant location permissions to use this app.',
				[{ text: 'Okay' }]
			)
			return false
		}
		return true
	}

	return (
		<MapView 
			onPress={(e) =>{ e.stopPropagation(); dispatch(clearSelectedGroup())}} 
			style={styles.map} 
			mapType={'mutedStandard'}
			initialRegion ={defaultLocation}
			showsUserLocation = {showUserLocation}
		>
    
			<TouchableOpacity style={styles.getMyPositionButton} onPress={() => setShowUserLocation(true)} >
				{
					loading ? <ActivityIndicator size='small' color={Colors.secondaryShade2} />
						:
						<MaterialIcons name="my-location" size={18} color={Colors.secondaryShade2} /> 
				}
			</TouchableOpacity>

			{allGroups && allGroups.map((group, index) => (
				<Marker key={group.key} coordinate={group.location} onPress={(e) => { e.stopPropagation(); dispatch(setSelectedGroup(group.key))

				}}>
					{group.selected?
						<View style={{...styles.group, ...styles.selectedGroupIcon}}>
							<FontAwesome name='group' size={14} color={'white'} 
							/>
						</View>
						: 
						<View style={styles.group}>
							<FontAwesome name='group' size={14} color={Colors.primary} 
							/>
						</View>
					}
				</Marker>
			))}
			{
				<View style={styles.selectedGroupContainer} > 
					{selectedGroup 
              &&
              <TouchableOpacity onPress={() => props.navigation.navigate('GroupDetail', {
              	id: selectedGroup.key,
              	name: selectedGroup.name,
              	description :selectedGroup.description,
              	city: selectedGroup.city,
              	location: selectedGroup.location,
              	postalCode: selectedGroup.postalCode,
              	photoUrl: selectedGroup.photoUrl,
              	admin: selectedGroup.admin,
              	dueDate: selectedGroup.dueDate,
              	members: selectedGroup.members,
              	membersDetails: selectedGroup.membersDetails,
              	maxSize: selectedGroup.maxSize
              })}>
              	<SelectedGroup group={selectedGroup}/>
              </TouchableOpacity> 
					}
				</View>
			}
		</MapView>
	)
}

const styles = StyleSheet.create({
	map: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	group: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 25, 
		height: 25, 
		borderRadius: 50, 
		backgroundColor: 'white',
		shadowOpacity: 0.4,
		shadowRadius: 2,
		shadowOffset: {width: 0, height: 0}
	},
	selectedGroupIcon: {
		borderWidth: 2,
		borderColor: 'white',
		borderStyle: 'solid',
		backgroundColor: Colors.primary,
	},
	selectedGroupContainer: {
		position: 'absolute',
		bottom: 30
	},
	getMyPositionButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		width: 55,
		height: 55,
		backgroundColor: 'white',
		borderRadius: 50, 
		shadowOpacity: 0.25,
		shadowRadius: 7,
		shadowOffset: {
			width: 4,
			height: 4
		},
		right: 30,
		bottom: 130
	},
})

export default MapScreen
