import React, {useState, useEffect, useCallback} from 'react'
import {View, StyleSheet, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native'
import User from '../../components/User'
import {Ionicons} from '@expo/vector-icons'
import {createGroup} from '../../store/actions/myGroups'
import {useDispatch, useSelector} from 'react-redux'


const FindUsers = props => {

	const groupData = props.route.params ? props.route.params.groupData : null
  
	const [users, setUsers] = useState([])
	const [filteredUsers, setFilteredUsers] = useState([])
	const [selectedUsers, setSelectedUsers] = useState([])
	const [searchText, setSearchText] = useState('')
	const userId = useSelector(state => state.auth.userId)
	const dispatch = useDispatch()

  
	const _createGroup = useCallback(() => {
		const selectedUserIds = []
		selectedUserIds.push(userId)
		selectedUsers.forEach(user => {
			selectedUserIds.push(user.id)
		})

		dispatch(createGroup(groupData.name, groupData.description, groupData.postalCode,groupData.city,groupData.type,selectedUserIds, groupData.photoUrl, groupData.dueDate))

		props.navigation.navigate('Groups')

	}, [selectedUsers])


	useEffect(() => {
		props.navigation.setOptions({
		headerRight: () => <Button title='Opret' onPress={_createGroup} />
		})
	}, [_createGroup])


	useEffect(() => {

		if(searchText!==''){
			let tempArray = []
			users.forEach(user => {
				if(user.name.includes(searchText)){
					tempArray.push(user)
					setFilteredUsers(tempArray)
				}
			})

		}
	}, [searchText])



	const userTappedHandler = (_user) => {
		if(selectedUsers.find(user => user.id === _user.id)){
			const updated = selectedUsers.filter((sitem) => sitem.id !== _user.id)
			setSelectedUsers(updated)
		} else {
			let tempArray = []
			tempArray.push(...selectedUsers,_user)
			setSelectedUsers(tempArray)
		}
	}



	return (
		<View style = {styles.parent}>
			<View>

				<View style={styles.searchBar}>

					<TextInput
						style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
						onChangeText={text => setSearchText(text)}
						value={searchText}
						placeholder='Søg efter brugere'
					/>

				</View>

				<View style={styles.buttonGroupContainer}>
					<FlatList
						data={filteredUsers}
						renderItem={({ item }) => 
							<TouchableOpacity onPress={() => userTappedHandler(item)}>
								<User
									key={item.id}
									name={item.name}
									gender={item.gender}
									city={item.city}
									postalCode={item.postalCode}
									photoUrl={item.photoUrl}
								/>

								<View style={styles.icon}>


									{selectedUsers.find(user => user.id === item.id)?
										<Ionicons name="md-checkmark" size={25} color="green" />
										:null}

								</View>

							</TouchableOpacity>
						}
						keyExtractor={item => item.id}
					/>
				</View>

			</View>
		</View>
	)
}

export const screenOptions = navigationData => {
	return {
		headerTitle: 'Find brugere',
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
	icon: {
		alignItems: 'center',
		justifyContent: 'center',
		left: 310,
		bottom: 60,
		height: 20,
		width: 20,
	},

	information: {
		borderWidth:1
	},
	buttonGroupContainer: {
		top: 60,
	},
	searchBar: {
		top: 30,
		width: 300,
		borderWidth: 1,
		borderColor: 'lightgrey'
	}
})

export default FindUsers
