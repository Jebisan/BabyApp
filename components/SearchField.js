import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Keyboard, FlatList } from 'react-native'
import colors from '../constants/colors'
import { MaterialIcons } from '@expo/vector-icons' 
import { AntDesign } from '@expo/vector-icons' 
import SwitchSelector from 'react-native-switch-selector'
import { SafeAreaView } from 'react-native'
import City from './City'


const SearchField = props => {

	const [searchString, setSearchString] = useState('')
	const [results, setResults] = useState([])
	const [selectedIndex, setSelectedIndex] = useState(0)
	const [inFocus, setInFocus] = useState(false)

	const clear = () => {
		setSearchString('')
	}

	const back = () => {
		console.log('BACK')
		setSearchString('')
		setInFocus(false)
		Keyboard.dismiss()
	}

	useEffect(() => {
		console.log(results)
	}, [results])

	useEffect(() => {
		if (!searchString) {
			setResults([])
			return
		}
		setResults([])
		fetch(`https://api.dataforsyningen.dk/kommuner/autocomplete?q=${searchString}`)
			.then(response => response.json())
			.then(data => {
				setResults(data)
			}
			)
	}, [searchString])

	useEffect(() => {
		if(inFocus){
			console.log('In focus!')
		} else {
			console.log('Out of focus')
		}
	}, [inFocus])
  
	const options = [
		{ label: 'Grupper', value: 0 },
		{ label: 'Personer', value: 1 },
	]

	return (
		<View style={styles.parent}>
			<View style={styles.container}>
				<View style={styles.searchbarContainer} >
					<TouchableOpacity style={inFocus?{display:'flex'}:{display:'none'}}   onPress={() => back()} >
						<AntDesign name="arrowleft" size={30} color={colors.darkGrey} />
					</TouchableOpacity>
					<View style={styles.textInputContainer} >
						<TouchableOpacity onPress={() => clear()} >
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
							<MaterialIcons onPress={() => clear()} style={searchString.length>0?{display:'flex'}:{display:'none'}} name="cancel" size={24} color={colors.darkGrey} />
						</View>
					</View>
				</View>
				<View style={styles.buttonContainer} >
					<SwitchSelector 
						options={options} 
						initial={0} 
						onPress={value => console.log(`Call onPress with value: ${value}`)} 
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
					<FlatList
						data={results}
						keyExtractor={item => item.tekst}
						renderItem={({ item }) => 
						<TouchableOpacity onPress={() => console.log(item.kommune.navn)} >
							<City name={item.kommune.navn} />						
						</TouchableOpacity>
						}
					/>
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
