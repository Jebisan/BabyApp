import React, { useEffect, useReducer } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View, TextInput, TouchableOpacity, Keyboard, FlatList } from 'react-native'
import colors from '../../../constants/colors'
import { AntDesign, MaterialIcons } from '@expo/vector-icons' 
import SwitchSelector from 'react-native-switch-selector'
import City from '../../../components/City'
import UserAutocomplete from '../../../components/UserAutocomplete'
import User from '../../../components/User'
import Group from '../../../components/Group'
import GroupAutocomplete from '../../../components/GroupAutocomplete'
import { Text } from 'react-native'

const initialState = {
	searchString: '',
	autocompleteResults: [],
	usersResults: [],
	groupsResults: [],
	selectedCity: undefined,
	inFocus: false,
	selectedSearchType: 0,
	showFilter: false,
	querySearch: false
}

function reducer(state, action) {
	switch (action.type) {
	case 'SET_SEARCH_STRING':
		return {...state, searchString: action.searchString}
	case 'SET_AUTOCOMPLETE_RESULTS':
		return {...state, autocompleteResults: action.autocompleteResults}
	case 'SET_USERS_RESULTS': 
		return {...state, usersResults: action.usersResults}
	case 'SET_GROUPS_RESULTS': 
		return {...state, groupsResults: action.groupsResults}
	case 'SET_SELECTED_CITY':
		return {...state, selectedCity: action.selectedCity}
	case 'SET_IN_FOCUS':
		return {...state, inFocus: action.inFocus}
	case 'SET_SELECTED_SEARCH_TYPE':
		return {...state, selectedSearchType: action.selectedSearchType}
	case 'SET_SHOW_FILTER':
		return {...state, showFilter: action.showFilter}
	case 'SET_QUERY_SEARCH':
		return {...state, querySearch: action.querySearch}

	default:
		throw new Error()
	}
}

const ListView = props => {
	const allUsers = useSelector(state => state.allUsers)
	const allGroups = useSelector(state => state.allGroups.allGroups)

	const [state, dispatch] = useReducer(reducer, initialState)

	useEffect(() => {
		return;
		console.clear();
		console.table(state);
	}, [state])

	const clear = () => {
		dispatch({type:'SET_SEARCH_STRING', searchString: ''})
		dispatch({type:'SET_SELECTED_CITY', searchString: undefined})
		dispatch({type:'SET_USERS_RESULTS', usersResults: []})
		dispatch({type:'SET_GROUPS_RESULTS', groupsResults: []})
		dispatch({type:'SET_AUTOCOMPLETE_RESULTS', autocompleteResults: []})
	}

	const back = () => {
		if (state.selectedCity) {
			dispatch({type:'SET_SEARCH_STRING', searchString: state.selectedCity.navn})
		} else if (state.querySearch) {
			dispatch({type:'SET_SEARCH_STRING', searchString: state.searchString})
		}
		dispatch({type: 'SET_IN_FOCUS', inFocus: false})
		Keyboard.dismiss()
	}

	// ONLY IN FOCUS STUFF
	useEffect(() => {
		/*
		if(state.querySearch) {
			return;
		}
		*/
		if(state.searchString === '') {
			dispatch({type:'SET_AUTOCOMPLETE_RESULTS', autocompleteResults: []})
			dispatch({type:'SET_USERS_RESULTS', usersResults: []})
			dispatch({type:'SET_GROUPS_RESULTS', groupsResults: []})
			return;
		}

		// UPDATE AUTOCOMPLETE CITY RESULTS.
		fetch(`https://api.dataforsyningen.dk/postnumre/autocomplete?q=${state.searchString}`)
			.then(response => response.json())
			.then(data => {
				const filteredArr = [...new Map(data.map(item => [item.postnummer.navn, {id: item.tekst, type: 'CITY', data: item}])).values()].slice(0,3)

		if (state.selectedSearchType === 0) {
			const groups = allGroups.filter(group => group.name.toLowerCase().includes(state.searchString.toLowerCase()));

			groups.forEach(group => {
				if(filteredArr.length !== 5) {
					filteredArr.push({
						id: group.key,
						type: 'GROUP',
						data: group

					})
				}
			});
		}

		if (state.selectedSearchType === 1) {
			const users = allUsers.filter(user => (user.firstname + ' ' + user.lastname).toLowerCase().includes(state.searchString.toLowerCase()));
			users.forEach(user => {
				if(filteredArr.length !== 5) {
					filteredArr.push({
						id: user.key,
						type: 'USER',
						data: user
						}
					)
				}
			})
		}
		dispatch({type:'SET_AUTOCOMPLETE_RESULTS', autocompleteResults: filteredArr})
	});
	}, [state.searchString, state.selectedSearchType])

	// OUT OF FOCUS STUFF
	useEffect(() => {
		if(state.inFocus) {
			return;
		}

		if(state.selectedCity) {
			if (state.selectedSearchType === 0){
				const groups = allGroups.filter(group => group.city === state.selectedCity.navn)
				dispatch({type:'SET_GROUPS_RESULTS', groupsResults: groups})
			} else if (state.selectedSearchType === 1) {
				const users = allUsers.filter(user => user.city === state.selectedCity.navn)
				dispatch({type:'SET_USERS_RESULTS', usersResults: users})
			}
		}

		if(state.querySearch) {
			if (state.selectedSearchType === 0){
				const groups = allGroups.filter(group => group.name.toLowerCase().includes(state.searchString.toLowerCase()))
				dispatch({type:'SET_GROUPS_RESULTS', groupsResults: groups})
			} else if (state.selectedSearchType === 1) {
				const users = allUsers.filter(user => (user.firstname + ' ' + user.lastname).toLowerCase().includes(state.searchString.toLowerCase()))
				dispatch({type:'SET_USERS_RESULTS', usersResults: users})
			}
		}

	}, [state.selectedSearchType])

	useEffect(() => {
		if (state.inFocus) {
			// dispatch({type:'SET_SELECTED_CITY', selectedCity: undefined})
			dispatch({type:'SET_QUERY_SEARCH', querySearch: false})

		} else {
			
		}
	}, [state.inFocus])


	// A city has been selected. Determine what to do depending on whether the search field is focused or not.

	useEffect(() => {
		if(!state.selectedCity){
			return
		}

		dispatch({type:'SET_SEARCH_STRING', searchString: state.selectedCity.navn})
		dispatch({type:'SET_IN_FOCUS', inFocus: false})
			Keyboard.dismiss()
	
				if (state.selectedSearchType === 0){
					const groups = allGroups.filter(group => group.city === state.selectedCity.navn)
					dispatch({type:'SET_GROUPS_RESULTS', groupsResults: groups})
				} else if (state.selectedSearchType === 1) {
					const users = allUsers.filter(user => user.city === state.selectedCity.navn)
					dispatch({type:'SET_USERS_RESULTS', usersResults: users})
				}

	}, [state.selectedCity])

	// Showing all results satifying the search query
	startQuerySearch = () => {
		dispatch({type:'SET_QUERY_SEARCH', querySearch: true})

	}

	useEffect(() => {
		if(!state.querySearch) {
			return;
		}
		if (state.selectedSearchType === 0){
			const groups = allGroups.filter(group => group.name.toLowerCase().includes(state.searchString.toLowerCase()))
			dispatch({type:'SET_GROUPS_RESULTS', groupsResults: groups})
		} else if (state.selectedSearchType === 1) {
			const users = allUsers.filter(user => (user.firstname + ' ' + user.lastname).toLowerCase().includes(state.searchString.toLowerCase()))
			dispatch({type:'SET_USERS_RESULTS', usersResults: users})
		}
		dispatch({type:'SET_SEARCH_STRING', searchString: state.searchString})
		dispatch({type:'SET_IN_FOCUS', inFocus: false})
		Keyboard.dismiss();

	}, [state.querySearch])

	autocompletePressedHandler = (item) => {
		switch(item.type) {
			case 'CITY':
				dispatch({type:'SET_SELECTED_CITY', selectedCity: item.data.postnummer})
				break;
			case 'USER':
				console.log('You pressed a User!')
				break;
			case 'GROUP':
				props.navigation.navigate('GroupDetail', { id: item.data.key })
				break;
			default:
				break;
		}
	}
	

	return (
		<View style={styles.parent}>
				<View style={styles.searchbarContainer} >
					<TouchableOpacity style={state.inFocus?{display:'flex'}:{display:'none'}}  onPress={() => back()} >
						<AntDesign name="arrowleft" size={30} color={colors.darkGrey} />
					</TouchableOpacity>
					<View style={styles.textInputContainer} >
						<TouchableOpacity >
							<MaterialIcons style={!state.inFocus?{display:'flex'}:{display:'none'}} name="search" size={24} color={colors.darkGrey} />
						</TouchableOpacity>
						<TextInput
							onChangeText={text => dispatch({type:'SET_SEARCH_STRING', searchString: text})}
							placeholder={'Søg'}
							style={styles.textInput}
							value={state.searchString}
							keyboardType={'web-search'}
							onFocus={() => dispatch({type: 'SET_IN_FOCUS', inFocus: true})}
						/>
						<View style={{position: 'absolute', right: 0, paddingRight: 15}} >
							<MaterialIcons name="filter-list" style={!state.inFocus? {display: 'flex'} : {display:'none'}}  size={24} color="black" />
							<MaterialIcons onPress={() => clear()} style={
								state.searchString.length > 0 && state.inFocus ? { display : 'flex' } : { display : 'none' }
							} name="cancel" size={24} color={colors.darkGrey} />
						</View>
					</View>
				</View>

				<View style={styles.buttonContainer} >
					<SwitchSelector 
						options={[{ label: 'Grupper', value: 0 },{ label: 'Personer', value: 1 },]} 
						initial={state.selectedSearchType}
						value={state.selectedSearchType}
						onPress={value => dispatch({type:'SET_SELECTED_SEARCH_TYPE', selectedSearchType: value})} 
						textColor={'black'} //'#7a44cf'
						selectedColor={'black'}
						backgroundColor={'#eeeef0'}
						buttonColor={'white'}
						borderColor={'#eeeef0'}
						selectedTextStyle={{fontFamily:'roboto-bold'}}
						textStyle={{fontFamily:'roboto-regular'}}
						hasPadding={true}
					/>
				</View>

				<View style={styles.autocompleteContainer} >
		
				{state.inFocus &&
					// AUTOCOMPLETE
						<FlatList
						style={styles.resultsContainer}
						horizontal={false}
						keyboardShouldPersistTaps='handled'
						keyExtractor={item => item.id}
						data={state.autocompleteResults}
						renderItem={({ item }) => 
						<TouchableOpacity onPress={() => autocompletePressedHandler(item)} >
							{item.type === 'CITY' && <City name = {item.data.postnummer.navn} />}
							{item.type === 'USER' && <UserAutocomplete firstname = {item.data.firstname} lastname = {item.data.lastname} photoUrl={item.data.photoUrl} />}
							{item.type === 'GROUP' && <GroupAutocomplete name = {item.data.name} photoUrl={item.data.photoUrl} />}
						</TouchableOpacity>
						}
					/>
				}
					{  state.searchString.length > 0 && state.inFocus &&
						<TouchableOpacity style={styles.seeAllResultsContainer} onPress={() => startQuerySearch()} > 
							<Text style={styles.seeAllResultsText}>Se resultater for</Text>
							<Text style={{...styles.seeAllResultsText, fontFamily: 'roboto-bold'}}> {state.searchString}</Text>
						</TouchableOpacity>
					}
				</View>

{	// OUT OF FOCUS STUFF WHEN CITY IS SELECTED: 
}

			{
			 !state.inFocus && !state.querySearch && state.selectedSearchType === 0 &&
					<FlatList
					style={styles.resultsContainer}
					horizontal={false}
					keyboardShouldPersistTaps='handled'
					keyExtractor={item => item.key}
					data={state.groupsResults}
					renderItem={({ item }) => 
					<TouchableOpacity onPress={() => props.navigation.navigate('GroupDetail', { id: item.key })}>
						<Group
							id={item.key}
							name={item.name}
							description={item.description}
							city={item.city}
							postalCode={item.postalCode}
							photoUrl={item.photoUrl}
							admin = {item.admin}
							dueDate = {item.dueDate}
							members = {item.members}
							membersDetails = {item.membersDetails}
							maxSize = {item.maxSize}
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
					keyExtractor={item => item.key}
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
		   keyExtractor={item => item.key}
		   data={state.groupsResults}
		   renderItem={({ item }) =>
		   <TouchableOpacity onPress={() => props.navigation.navigate('GroupDetail', { id: item.key })
		} >
		   <Group
			   id={item.key}
			   name={item.name}
			   description={item.description}
			   city={item.city}
			   postalCode={item.postalCode}
			   photoUrl={item.photoUrl}
			   admin = {item.admin}
			   dueDate = {item.dueDate}
			   members = {item.members}
			   membersDetails = {item.membersDetails}
			   maxSize = {item.maxSize}
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
		   keyExtractor={item => item.key}
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
		position:'relative',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		backgroundColor: colors.white,
		paddingHorizontal: 20,
		borderWidth: 0,
		borderStyle: 'solid', 
		borderColor: 'green',
		paddingVertical: 50,
		height: "100%"
	},
	searchbarContainer: {
		display: 'flex', 
		flexDirection: 'row', 
		justifyContent: 'center', 
		alignItems:'center',
		borderColor: 'yellow',
		borderWidth: 0,
		borderStyle: 'solid',
		position: 'relative'
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
		width: '90%',
		height: '100%',
		fontSize: 15,
		borderColor: 'blue',
		borderStyle: 'solid',
		borderWidth: 0,
	},
	buttonContainer: {
		margin: 20,
		width: 330
	},
	autocompleteContainer: {
		flexDirection: 'column', 
		justifyContent: 'flex-start', 
		borderWidth: 0, 
		borderColor: 'blue', 
		width: 330
	},
	autocompleteResults: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		width: 330,
		borderWidth: 0, 
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
	resultsContainer: {
		borderWidth: 0, 
		borderStyle: 'solid', 
		borderColor: 'pink',
	}
})

export default ListView
