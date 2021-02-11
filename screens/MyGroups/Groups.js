import React, {useEffect} from 'react'
import {StyleSheet, FlatList, View, Alert } from 'react-native'
import {useSelector} from 'react-redux'
import Group from '../../components/Group'
import HeaderButton from '../../components/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

const Groups = props => {
	const myGroups = useSelector(state => state.myGroups)

	useEffect(() => {
		props.navigation.setOptions({		
			headerRight: () => 
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="add"
					iconName= 'ios-add'
					onPress={() => props.navigation.navigate('CreateGroup')}
				/>
			</HeaderButtons>})
	}, [])

	return (
		<View style={styles.parent}>    
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
		membersDetails = {item.membersDetails}
		maxSize = {item.maxSize}
		/>
	  }
	  keyExtractor={item => item.id}
	  />
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
		paddingTop: 22
	},
	item: {
		padding: 10,
		fontSize: 18,
		height: 44,
	},
})