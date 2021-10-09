import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons'
import React, { useEffect, useReducer } from 'react'
import { ActivityIndicator } from 'react-native'
import { FlatList, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import SwitchSelector from 'react-native-switch-selector'
import { useDispatch, useSelector } from 'react-redux'
import City from '../../../components/City'
import Group from '../../../components/Group'
import User from '../../../components/User'
import colors from '../../../constants/colors'
import { getGroupsByCity, getGroupsByName, getUsersByCity, getUsersByName, toggleShowMap } from '../../../store/actions/find'
import { filterGroups } from '../../../shared/filter'
import FilterModal from '../../../components/FilterModal'
import { noResultsText } from '../../../shared/styles'

const initialState = {
	searchString: '',
	autocompleteResults: [],
	usersResults: [],
	groupsResults: [],
	groupsResultsFiltered: [],
	selectedCity: undefined,
	inFocus: false,
	selectedSearchType: 0,
	querySearch: false,
	loading: false,
	showFilter: false
}

function reducer(state, action) {
	switch (action.type) {
		case 'SET_SEARCH_STRING':
			return { ...state, searchString: action.searchString }
		case 'SET_AUTOCOMPLETE_RESULTS':
			return { ...state, autocompleteResults: action.autocompleteResults }
		case 'SET_USERS_RESULTS':
			return { ...state, usersResults: action.usersResults }
		case 'SET_GROUPS_RESULTS':
			return { ...state, groupsResults: action.groupsResults }
		case 'SET_GROUPS_RESULTS_FILTERED':
			return { ...state, groupsResultsFiltered: action. groupsResultsFiltered}
		case 'SET_SELECTED_CITY':
			return { ...state, selectedCity: action.selectedCity }
		case 'SET_IN_FOCUS':
			return { ...state, inFocus: action.inFocus }
		case 'SET_SELECTED_SEARCH_TYPE':
			return { ...state, selectedSearchType: action.selectedSearchType }
		case 'SET_SHOW_FILTER':
			return { ...state, showFilter: action.showFilter }
		case 'SET_QUERY_SEARCH':
			return { ...state, querySearch: action.querySearch }
		case 'SET_LOADING':
			return { ...state, loading: action.loading }
		default:
			throw new Error()
	}
}

const ListView = props => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const filter = useSelector(state => state.allGroups.filter)


	const reduxDispatch = useDispatch()

	useEffect(() => {
		return;
		console.clear()
		console.table(state)
	}, [state])

	const clear = () => {
		dispatch({ type: 'SET_SEARCH_STRING', searchString: '' })
		dispatch({ type: 'SET_SELECTED_CITY', searchString: undefined })
		dispatch({ type: 'SET_USERS_RESULTS', usersResults: [] })
		dispatch({ type: 'SET_GROUPS_RESULTS', groupsResults: [] })
		dispatch({ type: 'SET_AUTOCOMPLETE_RESULTS', autocompleteResults: [] })
	}

	const back = () => {
		if (!state.querySearch) {
			dispatch({ type: 'SET_SEARCH_STRING', searchString: state.searchString })
		} else {
			dispatch({ type: 'SET_SEARCH_STRING', searchString: state.selectedCity.navn })
		}
		dispatch({ type: 'SET_IN_FOCUS', inFocus: false })
		Keyboard.dismiss()
	}

	// AUTOCOMPLETE STUFF (IN FOCUS)
	useEffect(() => {
		if (state.searchString === '') {
			dispatch({ type: 'SET_AUTOCOMPLETE_RESULTS', autocompleteResults: [] })
			dispatch({ type: 'SET_USERS_RESULTS', usersResults: [] })
			dispatch({ type: 'SET_GROUPS_RESULTS', groupsResults: [] })

			return
		}

		fetch(`https://api.dataforsyningen.dk/postnumre/autocomplete?q=${state.searchString}`)
			.then(response => response.json())
			.then(data => {
				const filteredArr = [...new Map(data.map(item => [item.postnummer.navn, item])).values()].slice(0, 5)
				dispatch({ type: 'SET_AUTOCOMPLETE_RESULTS', autocompleteResults: filteredArr })
			})
	}, [state.searchString, state.selectedSearchType])

	// WHEN SELECTED_SEARCH_TYPE HAS CHANGED (OUT OF FOCUS)
	useEffect(() => {
		if (state.inFocus) {
			return
		}

		if (state.selectedCity) {
			startCitySearch();
		}

		if (state.querySearch) {
			startQuerySearch();
		}
	}, [state.selectedSearchType])


	// WHEN QUERY SEARCH IS SELECTED
	useEffect(() => {
		if (state.inFocus) {
			dispatch({ type: 'SET_QUERY_SEARCH', querySearch: false })
		}
	}, [state.inFocus])


	// A CITY HAS BEEN SELECTED
	useEffect(() => {
		if (!state.selectedCity) {
			return
		}

		startCitySearch();
		dispatch({ type: 'SET_SEARCH_STRING', searchString: state.selectedCity.navn })
		dispatch({ type: 'SET_IN_FOCUS', inFocus: false })
		Keyboard.dismiss()

	}, [state.selectedCity])

	useEffect(() => {
		if (!state.querySearch) {
			return
		}

		startQuerySearch();
		dispatch({ type: 'SET_SEARCH_STRING', searchString: state.searchString })
		dispatch({ type: 'SET_IN_FOCUS', inFocus: false })
		Keyboard.dismiss()

	}, [state.querySearch])

	startQuerySearch = () => {
		dispatch({ type: 'SET_LOADING', loading: true })

		if (state.selectedSearchType === 0) {
			//const groups = allGroups.filter(group => group.name.toLowerCase().includes(state.searchString.toLowerCase()))
			getGroupsByName(state.searchString.toLowerCase())
			.then(groups => {
				dispatch({ type: 'SET_GROUPS_RESULTS', groupsResults: groups })
			})
			.finally(() => {
				dispatch({ type: 'SET_LOADING', loading: false })
			})
		} else if (state.selectedSearchType === 1) {
			getUsersByName(state.searchString.toLowerCase())
			.then(users => {
				dispatch({ type: 'SET_USERS_RESULTS', usersResults: users })
			})
			.finally(() => {
				dispatch({ type: 'SET_LOADING', loading: false })
			})

		}
	}

	startCitySearch = () => {
		dispatch({ type: 'SET_LOADING', loading: true })

		if (state.selectedSearchType === 0) {
			getGroupsByCity(state.selectedCity.navn)
			.then(groups => {
				dispatch({ type: 'SET_GROUPS_RESULTS', groupsResults: groups })
			})
			.finally(() => {
				dispatch({ type: 'SET_LOADING', loading: false })

			})
		} else if (state.selectedSearchType === 1) {
			getUsersByCity(state.selectedCity.navn)
			.then(users => {
				dispatch({ type: 'SET_USERS_RESULTS', usersResults: users })
			})
			.finally(() => {
				dispatch({ type: 'SET_LOADING', loading: false })
			});
		}
	}

	useEffect(() => {
		const filteredResults = filterGroups(filter, state.groupsResults)
		dispatch({ type: 'SET_GROUPS_RESULTS_FILTERED', groupsResultsFiltered: filteredResults })

	}, [state.groupsResults, filter])

	return (
		<View style={styles.parent}>
		{
			state.showFilter && 
			<FilterModal
				showFilter={state.showFilter}
			  	setShowFilter={val => dispatch({ type: 'SET_SHOW_FILTER', showFilter: val})}
			/>
	  }

	  {

	  !state.inFocus &&
		<TouchableOpacity style={styles.findTypeButton} onPress={() => reduxDispatch(toggleShowMap())} >
			<FontAwesome name="map-o" size={16} color={colors.lightGrey} />
			<Text style={styles.buttonTitleStyle}> Kort</Text>
		</TouchableOpacity>
	}

			<View style={styles.searchbarContainer} >
				<TouchableOpacity style={state.inFocus ? { display: 'flex' } : { display: 'none' }} onPress={() => back()} >
					<AntDesign style={{right: 5}} name="arrowleft" size={30} color={colors.darkGrey} />
				</TouchableOpacity>
				<View style={styles.textInputContainer} >
					<TouchableOpacity >
						{
						!state.inFocus && state.loading ? <ActivityIndicator size='small' /> :
							<MaterialIcons style={!state.inFocus ? { display: 'flex' } : { display: 'none' }} name="search" size={24} color={colors.darkGrey} />
						}
					</TouchableOpacity>
					<TextInput
						onChangeText={text => dispatch({ type: 'SET_SEARCH_STRING', searchString: text })}
						placeholder={'Søg'}
						style={styles.textInput}
						value={state.searchString}
						keyboardType={'web-search'}
						onFocus={() => dispatch({ type: 'SET_IN_FOCUS', inFocus: true })}
						onSubmitEditing={() => dispatch({ type: 'SET_QUERY_SEARCH', querySearch: true })}
					/>
					<View style={{ position: 'absolute', right: 0, paddingRight: 15 }} >
						<MaterialIcons onPress={() => dispatch({ type: 'SET_SHOW_FILTER', showFilter: true })} name="filter-list" style={!state.inFocus && state.selectedSearchType === 0 ? { display: 'flex' } : { display: 'none' }} size={24} color={colors.darkGrey} />
						<MaterialIcons onPress={() => clear()} style={
							state.searchString.length > 0 && state.inFocus ? { display: 'flex' } : { display: 'none' }
						} name="cancel" size={24} color={colors.darkGrey} />
					</View>
				</View>
			</View>

			<SwitchSelector
				options={[{ label: 'Grupper', value: 0 }, { label: 'Personer', value: 1 },]}
				initial={state.selectedSearchType}
				value={state.selectedSearchType}
				onPress={value => dispatch({ type: 'SET_SELECTED_SEARCH_TYPE', selectedSearchType: value })}
				textColor={'black'} //'#7a44cf'
				selectedColor={'black'}
				backgroundColor={'#eeeef0'}
				buttonColor={'white'}
				borderColor={'#eeeef0'}
				selectedTextStyle={{ fontFamily: 'roboto-bold' }}
				textStyle={{ fontFamily: 'roboto-regular' }}
				hasPadding={true}
				style={styles.buttonContainer}
				height={styles.buttonContainer.height}
			/>


			{
			}

			{
				(!state.inFocus && !state.loading && (state.selectedCity || state.querySearch) && state.selectedSearchType === 0 && state.groupsResults.length === 0) &&
				<View style={{top: 200}} >
					<Text style={noResultsText} >Ingen grupper fundet</Text>
				</View>
			}


			{
				(!state.inFocus && !state.loading && (state.selectedCity || state.querySearch) && state.selectedSearchType === 1 && state.usersResults.length === 0) && 
				<View style={{top: 200}} >
					<Text style={noResultsText} >Ingen personer fundet</Text>
				</View>
			}


			{
				(!state.inFocus && state.selectedSearchType === 0 && state.groupsResultsFiltered.length !== 0) && 
				<View style={styles.buttonContainerBottomBorder} ></View>
			}

			{
				(!state.inFocus && state.selectedSearchType === 1 && state.usersResults.length !== 0) && 
				<View style={styles.buttonContainerBottomBorder} ></View>
			}

			{ state.inFocus &&
			<View style={styles.autocompleteContainer} >

				{state.inFocus &&
					// AUTOCOMPLETE
					<FlatList
						style={styles.autocompleteResults}
						horizontal={false}
						keyboardShouldPersistTaps='handled'
						keyExtractor={item => item.tekst}
						data={state.autocompleteResults}
						renderItem={({ item }) =>
							<TouchableOpacity onPress={() => dispatch({ type: 'SET_SELECTED_CITY', selectedCity: item.postnummer })} >
								<City name={item.postnummer.navn} />
							</TouchableOpacity>
						}
					/>
				}
				{state.searchString.length > 0 && state.inFocus &&
					<TouchableOpacity style={styles.seeAllResultsContainer} onPress={() => dispatch({ type: 'SET_QUERY_SEARCH', querySearch: true })} >
						<Text style={styles.seeAllResultsText}>Se resultater for</Text>
						<Text style={{ ...styles.seeAllResultsText, fontFamily: 'roboto-bold' }}> {state.searchString}</Text>
					</TouchableOpacity>
				}
			</View>
		}

			{	// OUT OF FOCUS STUFF WHEN CITY IS SELECTED: 
			}

			{
				!state.inFocus && !state.querySearch && state.selectedSearchType === 0 &&
				<FlatList
					style={styles.resultsContainer}
					horizontal={false}
					keyboardShouldPersistTaps='handled'
					keyExtractor={item => item.id}
					data={state.groupsResultsFiltered}
					renderItem={({ item }) =>
						<TouchableOpacity onPress={() => props.navigation.navigate('GroupDetail', {
							id: item.id,
							name: item.name,
							description: item.description,
							city: item.city,
							location: item.location,
							postalCode: item.postalCode,
							photoUrl: item.photoUrl,
							admin: item.admin,
							dueDate: item.dueDate,
							members: item.members,
							maxSize: item.maxSize,
							groupType: item.groupType
						})}>
							<Group
								id={item.id}
								name={item.name}
								description={item.description}
								city={item.city}
								location={item.location}
								postalCode={item.postalCode}
								photoUrl={item.photoUrl}
								admin={item.admin}
								dueDate={item.dueDate}
								members={item.members}
								maxSize={item.maxSize}
							/>
						</TouchableOpacity>
					}
				/>

			}
			{
				!state.inFocus && !state.querySearch && state.selectedSearchType === 1 &&
				<FlatList
					style={styles.resultsContainer}
					horizontal={false}
					keyboardShouldPersistTaps='handled'
					keyExtractor={item => item.id}
					data={state.usersResults}
					renderItem={({ item }) =>
						<User
							firstname={item.firstname}
							lastname={item.lastname}
							city={item.city}
							postalCode={item.postalCode}
							photoUrl={item.photoUrl}
						/>
					}
				/>
			}

			{	// OUT OF FOCUS STUFF WHEN CITY IS NOT SELECTED: 
			}
			{
				state.querySearch && state.selectedSearchType === 0 &&
					<FlatList
					style={styles.resultsContainer}
					horizontal={false}
					keyboardShouldPersistTaps='handled'
					keyExtractor={item => item.id}
					data={state.groupsResultsFiltered}
					renderItem={({ item }) =>
						<TouchableOpacity onPress={() => props.navigation.navigate('GroupDetail', {
							id: item.id,
							name: item.name,
							description: item.description,
							city: item.city,
							location: item.location,
							postalCode: item.postalCode,
							photoUrl: item.photoUrl,
							admin: item.admin,
							dueDate: item.dueDate,
							members: item.members,
							membersDetails: item.membersDetails,
							maxSize: item.maxSize,
							groupType: item.groupType
						})
						} >
							<Group
								id={item.id}
								name={item.name}
								description={item.description}
								city={item.city}
								postalCode={item.postalCode}
								location={item.location}
								photoUrl={item.photoUrl}
								admin={item.admin}
								dueDate={item.dueDate}
								members={item.members}
								membersDetails={item.membersDetails}
								maxSize={item.maxSize}
							/>
						</TouchableOpacity>
					}
				/>
				}
			{
				state.querySearch && state.selectedSearchType === 1 &&
				<FlatList
					style={styles.resultsContainer}
					horizontal={false}
					keyboardShouldPersistTaps='handled'
					keyExtractor={item => item.id}
					data={state.usersResults}
					renderItem={({ item }) =>
						<User
							firstname={item.firstname}
							lastname={item.lastname}
							city={item.city}
							postalCode={item.postalCode}
							photoUrl={item.photoUrl}
						/>
					}
				/>
			}
		</View>

	)
}

ListView.navigationOptions = () => {

	return {
		headerTitle: 'Hjem',
	}
}

const styles = StyleSheet.create({
	parent: {
		flexDirection: 'column',
		position: 'relative',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		backgroundColor: colors.white,
		paddingHorizontal: 0,
		borderWidth: 0,
		borderStyle: 'solid',
		borderColor: 'green',
		height: '100%'
	},
	locationPicker: {
		flex: 1,
	  },
	searchbarContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		borderColor: 'yellow',
		borderWidth: 0,
		borderStyle: 'solid',
		position: 'relative',
		top: 50
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
	},
	textInput: {
		fontFamily: 'roboto-regular',
		width: 280,
		height: '100%',
		fontSize: 15,
		borderColor: 'blue',
		borderStyle: 'solid',
		borderWidth: 0,
		paddingLeft: 7
	},
	buttonContainer: {
		margin: 20,
		width: 345,
		height: 34,
		top: 50,
	},
	autocompleteContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		borderWidth: 0,
		borderColor: 'blue',
		width: 330,
		top: 50
	},
	autocompleteResults: {
		position: 'relative',
		width: 330,
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
	resultsContainer: {
		borderWidth: 0,
		borderStyle: 'solid',
		borderColor: 'pink',
		top: 50
	},
	buttonContainerBottomBorder: {
		width: "100%",
		borderColor: colors.mediumGrey,
		borderStyle: 'solid',
		borderBottomWidth: 0.5,
		paddingVertical: 3,
		top: 50
	},
	buttonTitleStyle: {
		fontSize: 15,
		color: colors.lightGrey,
		fontFamily: 'roboto-medium',
	},
	findTypeButton:{
		position: 'absolute',
		zIndex: 4,
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

export default ListView
