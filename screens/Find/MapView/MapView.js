import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard } from 'react-native'
import MapView, {Marker}  from 'react-native-maps'
import { FontAwesome, MaterialIcons, AntDesign } from '@expo/vector-icons'
import Colors from '../../../constants/colors'
import SelectedGroup from '../../../components/SelectedGroup'
import City from '../../../components/City'
import * as Permissions from 'expo-permissions'
import {clearSelectedGroup, fetchSelectedGroup, setSelectedGroupIcon} from '../../../store/actions/allGroups'
import { FlatList } from 'react-native'
import { Text } from 'react-native'

const MapViewComponent = props => {
	const allGroupLocations = useSelector(state => state.allGroups.allGroupLocations)
	const selectedGroup = useSelector(state => state.allGroups.selectedGroup)

	const dispatch = useDispatch()
	const map = useRef()

	const back = () => {
		setInFocus(false);
		Keyboard.dismiss()
	}

	const clear = () => {
		setSearchString('')
	}


	const initialRegion = {
		latitude: 55.898147, 
		longitude: 10.429636, 
		latitudeDelta: 5.387598, 
		longitudeDelta: 5.227751
	}

	const [inFocus, setInFocus] = useState(false)
	const [searchString, setSearchString] = useState('')
	const [showUserLocation, setShowUserLocation] = useState(false)
	const [searchResults, setSearchResults] = useState([])

	useEffect(() => {
		if(getLocationPermission()) {
			console.log('Got permission!')
		} else {
			console.log('ERROR')
		}
	}, [])

	useEffect(() => {
		if (inFocus) {
			dispatch(clearSelectedGroup())
		} else {
			Keyboard.dismiss()
		}
	}, [inFocus])

	useEffect(() => {
		if(searchString === '') {
			setSearchResults([])
			return;
		}
		
		if (inFocus) {
			fetch(`https://api.dataforsyningen.dk/postnumre/autocomplete?q=${searchString}`)
			.then(response => response.json())
			.then(data => {
				const filteredArr = [...new Map(data.map(item => [item.postnummer.navn, item])).values()].slice(0, 5)
				setSearchResults(filteredArr)
			})
		}
	}, [searchString])

	const citySelected = (city) => {
		setSearchString(city.navn)
		const region = {
			latitude: city.visueltcenter_y,
			longitude: city.visueltcenter_x,
			latitudeDelta: 0.2,
			longitudeDelta: 0.2,
		  };
		  setTimeout(() => map.current.animateToRegion(region), 10);


	}


	const getUserLocationHandler = () => {
		if(!showUserLocation) {
			setShowUserLocation(true);
		}
		zoomToUserLocation();
	}

	const zoomToUserLocation = () => {
		try {
		  navigator.geolocation.getCurrentPosition(position => {
			  const region = {
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				latitudeDelta: 0.2,
				longitudeDelta: 0.2,
			  };
				setTimeout(() => map.current.animateToRegion(region), 10);
			}
		  );
		} catch(e) {
		  alert(e.message || "");
		}
	  };


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

	const groupSelectedHandler = (e, id) => {
		e.stopPropagation(); 
		dispatch(setSelectedGroupIcon(id))
		dispatch(fetchSelectedGroup(id))
	}

	const onRegionChange = () => {
		setInFocus(false);
	}


	return (
		<View style={styles.parent} >
		<View style={styles.searchbarContainer} >
		<TouchableOpacity style={inFocus ? { display: 'flex' } : { display: 'none' }} onPress={() => back()} >
			<AntDesign name="arrowleft" size={30} color={Colors.darkGrey} />
		</TouchableOpacity>
		<View style={styles.textInputContainer} >
			<TouchableOpacity >
				<MaterialIcons style={!inFocus ? { display: 'flex' } : { display: 'none' }} name="search" size={24} color={Colors.darkGrey} />
			</TouchableOpacity>
			<TextInput
				onChangeText={text => setSearchString(text)}
				placeholder={'Søg'}
				placeholderTextColor={Colors.darkGrey}
				style={styles.textInput}
				value={searchString}
				keyboardType={'web-search'}
				onFocus={() => setInFocus(true)}
			/>
			<View style={{ position: 'absolute', right: 0, paddingRight: 15 }} >
				<MaterialIcons name="filter-list" style={!inFocus ? { display: 'flex' } : { display: 'none' }} size={24} color={Colors.darkGrey} />
				<MaterialIcons onPress={() => clear()} style={
					searchString.length > 0 && inFocus ? { display: 'flex' } : { display: 'none' }
				} name="cancel" size={24} color={Colors.darkGrey} />
			</View>
		</View>
	</View>

	{inFocus &&
	<View style={styles.autocompleteContainer} >

		{
			// AUTOCOMPLETE
		}
		<FlatList
			horizontal={false}
			keyboardShouldPersistTaps='handled'
			keyExtractor={item => item.tekst}
			data={searchResults}
			renderItem={({ item }) =>
				<TouchableOpacity onPress={() => citySelected(item.postnummer)} >
					<City name={item.postnummer.navn} />
				</TouchableOpacity>
			}
		/>
		</View>
	}

	{
		// Render map if search field is not focused. Otherwise white background.
	}
		
	{
		inFocus &&
		<View style={styles.whiteBackground} ></View>
	}

			<MapView 
				ref = {map}
				onPress={(e) =>{ e.stopPropagation(); dispatch(clearSelectedGroup())}} 
				style={styles.map} 
				mapType={'mutedStandard'}
				initialRegion ={initialRegion}
				showsUserLocation = {showUserLocation}
				showsMyLocationButton={false}
				onRegionChange={() => onRegionChange()}
			>
		
				<TouchableOpacity style={styles.getMyPositionButton} onPress={() => getUserLocationHandler()} >
					<MaterialIcons name="my-location" size={18} color={Colors.secondaryShade2} /> 
				</TouchableOpacity>

				{allGroupLocations && allGroupLocations.map((group, index) => (
					<Marker key={group.id} coordinate={{latitude: group.latitude, longitude: group.longitude}} onPress={(e) => groupSelectedHandler(e, group.id)}>
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
			</MapView>
			
		{
			// Renders the SelectedGroup if search field is not focused.
		}
		{
				selectedGroup && !inFocus &&
			<View style={styles.selectedGroupContainer} > 

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
			</View>
		}
		  </View>
	)
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'center',
	
	}, 
	map: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 0
	},
	group: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 25, 
		height: 25, 
		borderRadius: 50, 
		backgroundColor: Colors.white,
		shadowOpacity: 0.4,
		shadowRadius: 2,
		shadowOffset: {width: 0, height: 0}
	},
	selectedGroupIcon: {
		borderWidth: 2,
		borderColor: Colors.white,
		borderStyle: 'solid',
		backgroundColor: Colors.primary,
	},
	selectedGroupContainer: {
		position: 'absolute',
		bottom: 30,
	},
	getMyPositionButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		width: 55,
		height: 55,
		backgroundColor: Colors.white,
		borderRadius: 50, 
		shadowOpacity: 0.25,
		shadowRadius: 7,
		shadowOffset: {
			width: 4,
			height: 4
		},
		right: 30,
		bottom: 130,
	},
	searchbarContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 50,
		width: 300,
		shadowOpacity: 0.20,
		shadowRadius: 12,
		shadowOffset: {
			width: 0, 
			height: 5
		},
		zIndex: 2
	},
	textInputContainer: {
		position: 'relative',
		height: 45,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderColor: Colors.mediumGrey,
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 25,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: Colors.white
	},
	textInput: {
		fontFamily: 'roboto-regular',
		width: '95%',
		height: '100%',
		fontSize: 15,
		borderColor: 'blue',
		borderStyle: 'solid',
		borderWidth: 0,
		paddingLeft: 2,
	},
	whiteBackground: {
		position: 'absolute', 
		backgroundColor: Colors.white, 
		width: '100%',
		height: '100%',
		zIndex: 1
	},
	autocompleteContainer: {
		top: 110,
		width: 320,
		position: 'absolute',
		zIndex: 2
	},
	autocompleteResults: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: 330,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'black',

	},
	seeAllResultsContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
	},
	seeAllResultsText: {
		color: Colors.lightBlue,
		paddingTop: 25,
		fontFamily: 'roboto-regular',
		fontSize: 15
	},

})

export default MapViewComponent
