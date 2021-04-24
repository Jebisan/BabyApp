import React, { useEffect, useRef, useState, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Keyboard, FlatList } from 'react-native'
import MapView, {Marker}  from 'react-native-maps'
import { FontAwesome, MaterialIcons, AntDesign, FontAwesome5 } from '@expo/vector-icons'
import colors from '../../../constants/colors'
import SelectedGroup from '../../../components/SelectedGroup'
import City from '../../../components/City'
import * as Permissions from 'expo-permissions'
import {clearSelectedGroup, fetchSelectedGroup, setSelectedGroupIcon} from '../../../store/actions/allGroups'
import { Icon } from 'react-native-elements'
import FilterModal from '../../../components/FilterModal'
import { toggleShowMap } from '../../../store/actions/find'

const initialState = {
	searchString: '',
	autocompleteResults: [],
	selectedCity: undefined,
	querySearch: false,
	inFocus: false,
	showFilter: false,
}

function reducer(state, action) {
	switch (action.type) {
		case 'SET_SEARCH_STRING':
			return { ...state, searchString: action.searchString }
		case 'SET_AUTOCOMPLETE_RESULTS':
			return { ...state, autocompleteResults: action.autocompleteResults }
		case 'SET_SELECTED_CITY':
			return { ...state, selectedCity: action.selectedCity }
		case 'SET_IN_FOCUS':
			return { ...state, inFocus: action.inFocus }
		case 'SET_SHOW_FILTER':
			return { ...state, showFilter: action.showFilter }
		case 'SET_QUERY_SEARCH':
			return { ...state, querySearch: action.querySearch }
		case 'SET_FILTER':
			return { ...state, filter: action.filter}

		default:
			throw new Error('Error in reducer')
	}
}
const MapViewComponent = props => {
	const filteredGroupLocations = useSelector(state => state.allGroups.filteredGroupLocations)
	const selectedGroup = useSelector(state => state.allGroups.selectedGroup)
	const user = useSelector(state => state.auth)
	const filter = useSelector(state => state.allGroups.filter)

	const [state, dispatch] = useReducer(reducer, initialState)

	const reduxDispatch = useDispatch()

	const map = useRef()

	const clear = () => {
		dispatch({ type: 'SET_SEARCH_STRING', searchString: '' })
	}

	const back = () => {
		dispatch({ type: 'SET_IN_FOCUS', inFocus: false })
		Keyboard.dismiss()
	}

	useEffect(() => {
		reduxDispatch({ type: 'UPDATE_ALL_GROUP_LOCATIONS' })
	}, [filter])

	const initialRegion = {
		latitude: 55.898147, 
		longitude: 10.429636, 
		latitudeDelta: 5.387598, 
		longitudeDelta: 5.227751
	}

	const [showUserLocation, setShowUserLocation] = useState(false)

	useEffect(() => {
		if(getLocationPermission()) {
			console.log('Got permission!')

			setupFilter()

		} else {
			console.log('ERROR')
		}
	}, [])

	setupFilter = () => {
		// GROUP TYPE INITIALIZATION: 
		//If "my" gender is female(0), then remove male (1) and vise verca. Then set the first index to selected.
		const typeToRemove = user.gender === 0 ? 1 : 0
		const filteredGroupTypes = filter.groupTypes.filter(element => element.type !== typeToRemove)


		filteredGroupTypes[0].selected = true;

		// EXPERIENCES INITIALIZATION: 
		// Choose the experience that matches the user's experience
			const mappedList = filter.experiences.map(experience => {
			if (experience.type === user.experience) {
				return {
					...experience, 
					selected: true,
				};
			} else {
				return {
					...experience
				};
			}
		});

		const initialFilter = {
			experiences: mappedList, 
			groupTypes: filteredGroupTypes,
			margin: filter.margin
		}
		reduxDispatch({ type: 'FILTER_UPDATED', filter: initialFilter })
	}

	useEffect(() => {
		if (state.inFocus) {
			reduxDispatch(clearSelectedGroup())
		} else {
			Keyboard.dismiss()
		}
	}, [state.inFocus])

	useEffect(() => {
		if(state.searchString === '') {
			dispatch({ type: 'SET_AUTOCOMPLETE_RESULTS', autocompleteResults: [] })
			return;
		}
		
		if (state.inFocus) {
			fetch(`https://api.dataforsyningen.dk/postnumre/autocomplete?q=${state.searchString}`)
			.then(response => response.json())
			.then(data => {
				const filteredArr = [...new Map(data.map(item => [item.postnummer.navn, item])).values()].slice(0, 5)
				dispatch({ type: 'SET_AUTOCOMPLETE_RESULTS', autocompleteResults: filteredArr })
			})
		}
	}, [state.searchString])

	const citySelected = (city) => {
		dispatch({ type: 'SET_SEARCH_STRING', searchString: city.navn })

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
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
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
		reduxDispatch(setSelectedGroupIcon(id))
		reduxDispatch(fetchSelectedGroup(id))
	}

	const onRegionChange = () => {
		dispatch({ type: 'SET_IN_FOCUS', inFocus: false })

	}


	return (
		<View style={styles.parent} >
		{
		  	state.showFilter && 
			  <FilterModal 
			  	showFilter={state.showFilter}
				setShowFilter={val => dispatch({ type: 'SET_SHOW_FILTER', showFilter: val})}
			  />
		}

			<TouchableOpacity style={styles.findTypeButton} onPress={() => reduxDispatch(toggleShowMap())} >
				<MaterialIcons name="list" size={25} color={colors.lightGrey} /> 
				<Text style={styles.buttonTitleStyle}>Liste</Text>
			</TouchableOpacity>

			<View style={styles.searchbarContainer} >
			<TouchableOpacity style={state.inFocus ? { display: 'flex' } : { display: 'none' }} onPress={() => back()} >
				<AntDesign style={{right: 5}} name="arrowleft" size={30} color={colors.darkGrey} />
			</TouchableOpacity>
			<View style={styles.textInputContainer} >
				<TouchableOpacity >
					<MaterialIcons style={!state.inFocus ? { display: 'flex' } : { display: 'none' }} name="search" size={24} color={colors.darkGrey} />
				</TouchableOpacity>
				<TextInput
					onChangeText={text => dispatch({ type: 'SET_SEARCH_STRING', searchString: text })}
					placeholder={'Søg'}
					placeholderTextColor={colors.darkGrey}
					style={styles.textInput}
					value={state.searchString}
					keyboardType={'web-search'}
					onFocus={() => dispatch({ type: 'SET_IN_FOCUS', inFocus: true })}
				/>
				<View style={{ position: 'absolute', right: 0, paddingRight: 15 }} >
					<MaterialIcons onPress={() => dispatch({ type: 'SET_SHOW_FILTER', showFilter: true })} name="filter-list" style={!state.inFocus ? { display: 'flex' } : { display: 'none' }} size={24} color={colors.darkGrey} />
					<MaterialIcons onPress={() => clear()} style={
						state.searchString.length > 0 && state.inFocus ? { display: 'flex' } : { display: 'none' }
					} name="cancel" size={24} color={colors.darkGrey} />
				</View>
			</View>
		</View>

		<TouchableOpacity style={styles.getMyPositionButton} onPress={() => getUserLocationHandler()} >
			<Icon
			name='my-location'
			type='MaterialIcons'
			size={18}
			color={colors.secondaryShade2}
			/>
		</TouchableOpacity>

		{state.inFocus &&
		<View style={styles.autocompleteContainer} >

			{
				// AUTOCOMPLETE
			}
			<FlatList
				horizontal={false}
				keyboardShouldPersistTaps='handled'
				keyExtractor={item => item.tekst}
				data={state.autocompleteResults}
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
			state.inFocus &&
			<View style={styles.whiteBackground} ></View>
		}

				<MapView 
					ref = {map}
					onPress={(e) =>{ e.stopPropagation(); reduxDispatch(clearSelectedGroup())}} 
					style={styles.map} 
					mapType={'mutedStandard'}
					initialRegion ={initialRegion}
					showsUserLocation = {showUserLocation}
					showsMyLocationButton={false}
					onRegionChange={() => onRegionChange()}
					userLocationAnnotationTitle = 'Dig'
				>
					{filteredGroupLocations && filteredGroupLocations.map((group, index) => (
						<Marker key={group.id} coordinate={{latitude: group.latitude, longitude: group.longitude}} onPress={(e) => groupSelectedHandler(e, group.id)}>
							{group.selected?
								<View style={{...styles.group, ...styles.selectedGroupIcon}}>
									<FontAwesome name='group' size={14} color={'white'} 
									/>
								</View>
								: 
								<View style={styles.group}>
									<FontAwesome name='group' size={14} color={colors.primary} 
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
					selectedGroup && !state.inFocus &&
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
					maxSize: selectedGroup.maxSize,
					groupType: selectedGroup.groupType
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
		backgroundColor: colors.white,
		shadowOpacity: 0.4,
		shadowRadius: 2,
		shadowOffset: {width: 0, height: 0}
	},
	selectedGroupIcon: {
		borderWidth: 2,
		borderColor: colors.white,
		borderStyle: 'solid',
		backgroundColor: colors.primary,
	},
	selectedGroupContainer: {
		position: 'absolute',
		bottom: 30,
		zIndex: 3
	},
	getMyPositionButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		right: 30,
		top: 550,
		width: 55,
		height: 55,
		backgroundColor: colors.white,
		borderRadius: 50, 
		borderWidth: 1,
		borderColor: colors.mediumGrey,
		borderStyle: 'solid',
		shadowOpacity: 0.25,
		shadowRadius: 7,
		shadowOffset: {
			width: 4,
			height: 4
		},
		zIndex: 3
	},
	searchbarContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'absolute',
		top: 50,
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
		borderColor: colors.mediumGrey,
		borderStyle: 'solid',
		borderWidth: 1,
		borderRadius: 25,
		paddingLeft: 15,
		paddingRight: 15,
		backgroundColor: colors.white
	},
	textInput: {
		fontFamily: 'roboto-regular',
		width: 280,
		height: '100%',
		fontSize: 15,
		borderColor: 'blue',
		borderStyle: 'solid',
		borderWidth: 0,
		paddingLeft: 7,
	},
	whiteBackground: {
		position: 'absolute', 
		backgroundColor: colors.white, 
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
		color: colors.lightBlue,
		paddingTop: 25,
		fontFamily: 'roboto-regular',
		fontSize: 15
	},
	buttonTitleStyle: {
		fontSize: 15,
		color: colors.lightGrey,
		fontFamily: 'roboto-medium',
	},
	findTypeButton:{
		position: 'absolute',
		zIndex: 3,
		top: 640,
		left: 250,
		width: 90,
		height: 40,
		borderRadius: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.primary,
		shadowRadius: 6,
		shadowOpacity: 0.3,
		shadowOffset: { 
			width: 6, 
			height: 6 },
		shadowColor: colors.normalBlue
	},

})

export default MapViewComponent
