import React, {useState} from 'react'
import {View, StyleSheet, Text, TextInput } from 'react-native'
import {ButtonGroup} from 'react-native-elements'

const CreateGroup = props => {

	const [selectedIndex, setSelectedIndex] = useState(0)
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [postalCode, setPostalCode] = useState('')
	const [city, setCity] = useState('')
	const [dueDate, setDueDate] = useState('December')


	const updateIndex =(selectedIndex) => {
		setSelectedIndex(selectedIndex)
	}


	return (
		<View style = {styles.parent}>

			<View style = {styles.information}>
    

				<TextInput
					style={styles.textInput}
					onChangeText={text => setName(text)}
					value={name}
					placeholder='Navn'
				/>

				<TextInput
					style={styles.textInput}
					onChangeText={text => setDescription(text)}
					value={description}
					placeholder='Beskrivelse'
				/>

				<TextInput
					textContentType='postalCode'
					placeholder='Postnummer'
					style={styles.textInput}
					onChangeText={text => setPostalCode(text)}
					value={postalCode}
				/>

				<TextInput
					editable={false}
					textContentType='addressCity'
					placeholder='By'
					style={styles.textInput}
					onChangeText={text => setCity(text)}
					value={city}
				/>


			</View>
			<View style={{ marginTop: 32 }}>
				<Text style={styles.inputTitle}>Termin i {dueDate}.</Text>

			</View>

			<View style= {styles.buttonGroupContainer} >
				<ButtonGroup
					onPress={updateIndex}
					selectedIndex={selectedIndex}
					buttons={['Mødregrupper', 'Fædregrupper']}
					containerStyle={{height: 30}} 
				/>
			</View>
		</View>
	)
}

export const screenOptions = navigationData => {
	const save = navigationData.route.params ? navigationData.route.params : null;

	return {
		headerTitle: 'Ny gruppe'
	}
}

const styles = StyleSheet.create({
	parent: {
		paddingTop: 20,
		justifyContent: 'flex-start',
		alignItems: 'center',
	} ,
	headerText: {
		fontSize: 30,
		fontWeight: 'bold'
	},
	textInput: { 
		height: 40, 
		borderColor: 'lightgray', 
		borderWidth: 1,
		width: 230,
		padding: 10
	},

	information: {
	},
	buttonGroupContainer: {
		top: 20,
		width: 300,
	},
	dateInput: {
		borderTopColor: 'white',
		borderLeftColor: 'white',
		borderRightColor: 'white',
		borderBottomColor: '#8A8F9E',
		borderBottomWidth: StyleSheet.hairlineWidth,
		height: 40,
		fontSize: 15,
		color: '#161F3D',
		width: 100
	},
	dateText:{
		fontSize: 15,
		color: '#161F3D',
		width: 100
	},
	inputTitle: {
		color: '#8A8F9E',
		fontSize: 14,
    
	},

})

export default CreateGroup
