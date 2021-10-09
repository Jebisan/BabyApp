import React, {useEffect, useState} from 'react'
import {StyleSheet, FlatList, View, Alert, Touchable } from 'react-native'
import {useSelector} from 'react-redux'
import Group from '../../components/Group'
import HeaderButton from '../../components/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons'
import CreateGroup from './CreateGroup'
import {blueFloatingButton} from '../../shared/styles'
import colors from '../../constants/colors'

const Groups = props => {
	const myGroups = useSelector(state => state.myGroups)
	const [showCreateGroup, setShowCreateGroup] = useState(false);

	const toggleShowCreateGroup = () => {
		console.log(showCreateGroup)
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
		{showCreateGroup && 
		<CreateGroup toggleShowCreateGroup={() => toggleShowCreateGroup()}  />
		}
			<View style={styles.container}>    
				<FlatList
				data={myGroups}
				renderItem={({ item }) => 
				<TouchableOpacity onPress={() => props.navigation.navigate('GroupScreen', {
					id: item.id,
					name: item.name,
					description: item.description,
					city: item.city,
					postalCode: item.postalCode,
					photoUrl: item.photoUrl,
					admin: item.admin,
					dueDate: item.dueDate,
					memberIds: item.memberIds,
					members: item.members,
					maxSize: item.maxSize,
					})} >
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
					memberIds = {item.memberIds}
					maxSize = {item.maxSize}
					/>
				</TouchableOpacity>
			}
			keyExtractor={item => item.id}
			/>
			<TouchableOpacity onPress={() => Alert.alert('Coming soon', 'Work in progress')} style={blueFloatingButton}>
				<MaterialCommunityIcons name="plus" size={24} color={colors.white} />
			</TouchableOpacity>
		</View>
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
		paddingTop: 50,
		width: '100%',
		height: '100%'
	}
})