import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, FlatList } from 'react-native'
import colors from '../constants/colors'
import { AntDesign, MaterialIcons } from '@expo/vector-icons' 
import SwitchSelector from 'react-native-switch-selector'
import City from './City'
import { useSelector } from 'react-redux'
import User from '../components/User'
import Group from '../components/Group'


const SearchField = props => {
	const allUsers = useSelector(state => state.allUsers)
	const allGroups = useSelector(state => state.allGroups.allGroups)

	const [searchString, setSearchString] = useState('')
	const [cityResults, setCityResults] = useState([])
	const [usersResults, setUsersResults] = useState([])
	const [groupsResults, setGroupsResults] = useState([])
	const [selectedCity, setSelectedCity] = useState(undefined)
	const [inFocus, setInFocus] = useState(false)
	const [selectedSearchType, setSelectedSearchType] = useState(0)

	const clear = () => {
		setSearchString('');
		setSelectedCity(undefined);
		setUsersResults([]);
		setGroupsResults([]);
	}

	const back = () => {
		if (!searchString && selectedCity) {
			setSearchString(selectedCity.navn);
		}
		setInFocus(false);
		Keyboard.dismiss()
	}

	useEffect(() => {
		if (!searchString) {
			return
		}
		setCityResults([])
		if(inFocus){
			fetch(`https://api.dataforsyningen.dk/postnumre/autocomplete?q=${searchString}`)
			.then(response => response.json())
			.then(data => {
				  const filteredArr = [...new Map(data.map(item => [item.postnummer.navn, item])).values()]
				setCityResults(filteredArr)
			}
			)
		}

	}, [searchString])

	useEffect(() => {
		if(!selectedCity){
			return;
		}
		setSearchString(selectedCity.navn)
		setInFocus(false)
		setCityResults([]);
		Keyboard.dismiss()

		if (selectedSearchType === 0){
			const groups = allGroups.filter(group => group.city === selectedCity.navn)
			setGroupsResults(groups);
		} else if (selectedSearchType === 1) {
			const users = allUsers.filter(user => user.city ===selectedCity.navn)
			setUsersResults(users);
		}
	}, [selectedCity, selectedSearchType])
  
	const options = [
		{ label: 'Grupper', value: 0 },
		{ label: 'Personer', value: 1 },
	]

	return (
		<View style={styles.parent}>
			<View style={styles.container}>
				<View style={styles.searchbarContainer} >
					<TouchableOpacity style={inFocus?{display:'flex'}:{display:'none'}}  onPress={() => back()} >
						<AntDesign name="arrowleft" size={30} color={colors.darkGrey} />
					</TouchableOpacity>
					<View style={styles.textInputContainer} >
						<TouchableOpacity >
							<MaterialIcons style={!inFocus?{display:'flex'}:{display:'none'}} name="search" size={24} color={colors.darkGrey} />
						</TouchableOpacity>
						<TextInput
							onChangeText={text => setSearchString(text)}
							placeholder={'Søg'}
							style={styles.textInput}
							value={searchString}
							keyboardType={'web-search'}
							onFocus={() => setInFocus(true)}
						/>
						<View style={{position: 'absolute', right: 0, paddingRight: 15}} >
							<MaterialIcons name="filter-list" style={ selectedCity && !inFocus? {display: 'flex'} : {display:'none'}}  size={24} color="black" />
							<MaterialIcons onPress={() => clear()} style={
								searchString.length > 0 && inFocus ? { display : 'flex' } : { display : 'none' }
							} name="cancel" size={24} color={colors.darkGrey} />
						</View>
					</View>
				</View>
				<View style={styles.buttonContainer} >
					<SwitchSelector 
						options={options} 
						initial={0} 
						onPress={value => setSelectedSearchType(value)} 
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
					inFocus ?
					<FlatList
						keyboardShouldPersistTaps='handled'
						data={cityResults}
						keyExtractor={item => item.postnummer.nr}
						renderItem={({ item }) => 
						<TouchableOpacity onPress={() => setSelectedCity(item.postnummer)} >
							<City name={item.postnummer.navn} />						
						</TouchableOpacity>
						}
					/>
					:
					<FlatList
					keyboardShouldPersistTaps='handled'
					data={selectedSearchType === 0 ? groupsResults : usersResults}
					keyExtractor={item => item.key}
					renderItem={({ item }) => 
					<TouchableOpacity>
					{
						selectedSearchType=== 0 ? 
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

SearchField.navigationOptions = navigationData => {

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

export default SearchField
