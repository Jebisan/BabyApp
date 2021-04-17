import React, {useEffect, useState} from 'react'
import {StyleSheet, FlatList, View, Alert } from 'react-native'
import {useSelector} from 'react-redux'
import Group from '../../components/Group'
import HeaderButton from '../../components/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { Button } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text } from 'react-native'
import colors from '../../constants/colors'
import {Ionicons} from '@expo/vector-icons'
import CreateGroup from './CreateGroup'

const Groups = props => {
	const myGroups = useSelector(state => state.myGroups)

	const [showCreateGroup, setShowCreateGroup] = useState(false);

	const toggleShowCreateGroup = () => {
		setShowCreateGroup(!showCreateGroup);
	}

	useEffect(() => {
		props.navigation.setOptions({		
			headerRight: () => 
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="add"
					iconName= 'ios-add'
				/>
			</HeaderButtons>})
	}, [])

	return (
		<View style={{flex: 1}} >
		{showCreateGroup?
		<CreateGroup toggleShowCreateGroup={() => toggleShowCreateGroup()}  />
		:
			<View style={styles.container}>    
			<FlatList
			data={myGroups}
			renderItem={({ item }) => 
			<Group
			id={item.id}
			name={item.name}
			description={item.description}
			city={item.city}
			postalCode={item.postalCode}
			photoUrl={item.photoUrl}
			admin = {item.admin}
			dueDate = {item.dueDate}
			members = {item.members}
			maxSize = {item.maxSize}
			/>
		}
		keyExtractor={item => item.id}
		/>
		<TouchableOpacity style={styles.newGroupContainer} onPress={() => toggleShowCreateGroup()} >
		<Ionicons name="md-add-circle-outline" size={40} color={'white'} />
		</TouchableOpacity>
		</View>
	}

	</View>

	)
}

export default Groups


export const screenOptions = navigationData => {
	return {
		headerTitle: 'Mine grupper',
}
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50
	},
	newGroupContainer: {
		position: 'relative',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.primary,
		borderRadius: 50,
		width: 40,
		height: 40,
		left: '80%',
		bottom: '50%'
	}
})