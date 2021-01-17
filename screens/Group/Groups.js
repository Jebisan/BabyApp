import React, {useEffect} from 'react'
import {StyleSheet, FlatList, View, TouchableOpacity, Alert } from 'react-native'
import {useSelector} from 'react-redux'
import Group from '../../components/Group'
import HeaderButton from '../../components/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

const Groups = props => {
	const myGroups = useSelector(state => state.myGroups)
	const state = useSelector(state => state)

	useEffect(() => {
	}, [])


	return (
		<View style={styles.parent}>
    

			<FlatList
				data={myGroups}
				keyExtractor={item => item.id}
				renderItem={({item}) =>
					<TouchableOpacity onPress={() => props.navigation.navigate('GroupScreen', {
						id: item.id,
						members: item.members,
						groupName: item.name,
						admin: item.admin,
						description: item.description,
						location: item.location
					})}
					>
						<Group
							name = {item.name}
							description = {item.description}
							city = {item.city}
							postalCode = {item.postalCode}
							photoUrl = {item.photoUrl}
							dueDate = {item.dueDate}
						/>
					</TouchableOpacity>
				}
			/>
		</View>

	)
}

export default Groups


export const screenOptions = navigationData => {
	return {
		headerTitle: 'Mine grupper',
		headerRight: () =>

    <HeaderButtons HeaderButtonComponent={HeaderButton}>
    	<Item
    		title="add"
    		iconName= 'ios-add'
    		onPress={() => Alert.alert('Not supported at the moment.')/*navigationData.navigation.navigate('CreateGroup')*/}
    	/>
    </HeaderButtons>  }
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