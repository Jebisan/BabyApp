import React, {useEffect} from 'react'
import {StyleSheet, FlatList, View, TouchableOpacity, Alert } from 'react-native'
import {useSelector} from 'react-redux'
import Group from '../../components/Group'
import HeaderButton from '../../components/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import { Text } from 'react-native'

const Groups = props => {
	const myGroups = useSelector(state => state.myGroups)
	const state = useSelector(state => state)

	useEffect(() => {
	}, [])


	return (
		<View style={styles.parent}>
    

		<FlatList
		data={myGroups}
		renderItem={({ item }) => 
		<Text>{item.name}</Text>
	  }
	  keyExtractor={item => item.key}
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