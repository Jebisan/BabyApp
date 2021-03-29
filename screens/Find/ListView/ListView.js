import React, { useEffect, useReducer } from 'react'
import { useSelector } from 'react-redux'
import { StyleSheet, View, TextInput, TouchableOpacity, Keyboard, FlatList } from 'react-native'
import colors from '../../../constants/colors'
import { AntDesign, MaterialIcons } from '@expo/vector-icons' 
import SwitchSelector from 'react-native-switch-selector'
import City from '../../../components/City'
import User from '../../../components/User'
import Group from '../../../components/Group'

const initialState = {
	searchString: '',
	cityResults: [],
	usersResults: [],
	groupsResults: [],
	selectedCity: undefined,
	inFocus: false,
	selectedSearchType: 0
};

function reducer(state, action) {
	switch (action.type) {
		case 'SET_SEARCH_STRING':
			return {...state, searchString: action.searchString};
		case 'SET_CITY_RESULTS':
			return {...state, cityResults: action.cityResults};
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
	  default:
		throw new Error();
	}
  }

const ListView = props => {
	const allUsers = useSelector(state => state.allUsers)
	const allGroups = useSelector(state => state.allGroups.allGroups)

	const [state, dispatch] = useReducer(reducer, initialState);


	const clear = () => {
		dispatch({type:'SET_SEARCH_STRING', searchString: ''})
		dispatch({type:'SET_SELECTED_CITY', searchString: undefined})
		dispatch({type:'SET_USERS_RESULTS', usersResults: []})
		dispatch({type:'SET_GROUPS_RESULTS', groupsResults: []})
		dispatch({type:'SET_CITY_RESULTS', cityResults: []})
	}

	const back = () => {
		if (!state.searchString && state.selectedCity) {
			dispatch({type:'SET_SEARCH_STRING', searchString: state.selectedCity.navn})
		}
		dispatch({type: 'SET_IN_FOCUS', inFocus: false})
		Keyboard.dismiss()
	}

	useEffect(() => {
		if (!state.searchString) {
			return
		}
		dispatch({type:'SET_CITY_RESULTS', cityResults: []})

		if(state.inFocus){
			fetch(`https://api.dataforsyningen.dk/postnumre/autocomplete?q=${state.searchString}`)
			.then(response => response.json())
			.then(data => {
				  const filteredArr = [...new Map(data.map(item => [item.postnummer.navn, item])).values()]
				  dispatch({type:'SET_CITY_RESULTS', cityResults: filteredArr})
			}
			)
		}

	}, [state.searchString])

	useEffect(() => {
		if(!state.selectedCity){
			return;
		}
		dispatch({type:'SET_SEARCH_STRING', searchString: state.selectedCity.navn})
		dispatch({type: 'SET_IN_FOCUS', inFocus: false})
		dispatch({type:'SET_CITY_RESULTS', cityResults: []})

		Keyboard.dismiss()

		if (state.selectedSearchType === 0){
			const groups = allGroups.filter(group => group.city === state.selectedCity.navn)
			dispatch({type:'SET_GROUPS_RESULTS', groupsResults: groups})
		} else if (state.selectedSearchType === 1) {
			const users = allUsers.filter(user => user.city === state.selectedCity.navn)
			dispatch({type:'SET_USERS_RESULTS', usersResults: users})
		}
	}, [state.selectedCity, state.selectedSearchType])
  
	const options = [
		{ label: 'Grupper', value: 0 },
		{ label: 'Personer', value: 1 },
	]

	return (
		<View style={styles.parent}>
			<View style={styles.container}>
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
							<MaterialIcons name="filter-list" style={ state.selectedCity && !state.inFocus? {display: 'flex'} : {display:'none'}}  size={24} color="black" />
							<MaterialIcons onPress={() => clear()} style={
								state.searchString.length > 0 && state.inFocus ? { display : 'flex' } : { display : 'none' }
							} name="cancel" size={24} color={colors.darkGrey} />
						</View>
					</View>
				</View>
				<View style={styles.buttonContainer} >
					<SwitchSelector 
						options={options} 
						initial={0} 
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
				<View style={styles.resultsContainer} >
				{
					state.inFocus ?
					<FlatList
						horizontal={false}
						keyboardShouldPersistTaps='handled'
						data={state.cityResults}
						keyExtractor={item => item.postnummer.nr}
						renderItem={({ item }) => 
						<TouchableOpacity onPress={() => dispatch({type:'SET_SELECTED_CITY', selectedCity: item.postnummer})} >
							<City name={item.postnummer.navn} />						
						</TouchableOpacity>
						}
					/>
					:
					<FlatList
					horizontal={false}
					keyboardShouldPersistTaps='handled'
					data={state.selectedSearchType === 0 ? state.groupsResults : state.usersResults}
					keyExtractor={item => item.key}
					renderItem={({ item }) => 
					<TouchableOpacity>
					{
						state.selectedSearchType=== 0 ? 
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
						: 
						<User 
							name={item.firstname} 
							postalCode={item.postalCode} 
							city={item.city}
							photoUrl={item.photoUrl} 
						/>	
					}

					</TouchableOpacity>					}
					/>

				}
				</View>
			</View>
                

		</View>

	)
}

ListView.navigationOptions = navigationData => {

	return {
		headerTitle: 'Hjem',
	}
}

const styles = StyleSheet.create({
	parent: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		height: '100%',
		backgroundColor: colors.lightGrey,
		paddingHorizontal: 20

	},
	container: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		alignItems: 'center',
		top: 80,
		borderColor: 'red',
		borderWidth: 0,
		borderStyle: 'dashed'

	},
	searchbarContainer: {
		display: 'flex', 
		flexDirection: 'row', 
		justifyContent: 'center', 
		alignItems:'center',
	},
	textInputContainer: {
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
	resultsContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		position: 'relative',
		width: 330,
		height: 500,

		/*
		borderWidth: 1, 
		borderStyle: 'solid', 
		borderColor: 'lightgrey',
		*/

	}
})

export default ListView
