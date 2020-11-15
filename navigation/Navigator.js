import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, Button, SafeAreaView } from 'react-native'
import {useDispatch} from 'react-redux'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import {logOut} from '../store/actions/auth'

//AUTH
import Login from '../screens/Auth/Login'
import SignUp from '../screens/Auth/SignUp'
import CreateAdditionalInformation from '../screens/Auth/CreateAdditionalInformation'

//HOME
import HomeScreen from '../screens/Home/HomeScreen'

//CHATSCREENS
import GroupChat from '../screens/ChatScreens/GroupChat'
import DirectMessage from '../screens/ChatScreens/DirectMessage'
import DirectMessages, {screenOptions as directMessagesScreenOptions} from '../screens/DirectMessages'

//PROFILE
import Settings, {screenOptions as settingsScreenOptions} from '../screens/Profile/Settings'
import Profile, {screenOptions as profileScreenOptions} from '../screens/Profile/Profile'
import ChildScreen, {screenOptions as childScreenScreenOptions} from '../screens/Profile/ChildScreen'

//FIND
import GroupDetail from '../screens/Find/GroupDetail'
import UserDetail from '../screens/Find/UserDetail'
import Find from '../screens/Find/Find'
import MapScreen from '../components/MapScreen'

//GROUPS
import Groups, {screenOptions as groupsScreenOptions} from '../screens/Group/Groups'
import FindUsers, {screenOptions as findUsersScreenOptions} from '../screens/Group/FindUsers'
import CreateGroup, {screenOptions as createGroupScreenOptions} from '../screens/Group/CreateGroup'
import GroupScreen, {screenOptions as groupScreenScreenOptions} from '../screens/Group/GroupScreen'
import AddUsersToGroup, {screenOptions as addUsersToGroupScreenOptions} from '../screens/Group/AddUsersToGroup'
import Request from '../screens/Group/Request' // SHOULD BE MOVED TO COMPONENTS. NOT A SCREEN.


const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
	return <AuthStackNavigator.Navigator>
		<AuthStackNavigator.Screen name = 'Login' component = {Login} />
		<AuthStackNavigator.Screen name = 'SignUp' component = {SignUp} />
	</AuthStackNavigator.Navigator>
}

const GroupsStackNavigator = createStackNavigator();

export const GroupsNaviagator = () => {
	return <GroupsStackNavigator.Navigator>
				<GroupsStackNavigator.Screen name = 'Groups' component = {Groups} options = {groupsScreenOptions} />
				<GroupsStackNavigator.Screen name = 'CreateGroup' component = {CreateGroup} options = {createGroupScreenOptions} />
				<GroupsStackNavigator.Screen name = 'FindUsers' component = {FindUsers} options = {findUsersScreenOptions} />
				<GroupsStackNavigator.Screen name = 'GroupScreen' component = {GroupScreen} options = {groupScreenScreenOptions} />
				<GroupsStackNavigator.Screen name = 'AddUsersToGroup' component = {AddUsersToGroup} options = {addUsersToGroupScreenOptions} />
				<GroupsStackNavigator.Screen name = 'GroupChat' component = {GroupChat} />
				<GroupsStackNavigator.Screen name = 'Request' component = {Request} />
				<GroupsStackNavigator.Screen name = 'UserDetail' component = {UserDetail} />
	</GroupsStackNavigator.Navigator>
}

const FindStackNavigator = createStackNavigator();

export const FindNaviagator = () => {
	return <FindStackNavigator.Navigator>
				<FindStackNavigator.Screen name = 'Find' component = {Find} />
				<FindStackNavigator.Screen name = 'UserDetail' component = {UserDetail} />
				<FindStackNavigator.Screen name = 'GroupDetail' component = {GroupDetail} />
				<FindStackNavigator.Screen name = 'GroupChat' component = {GroupChat} />
				<FindStackNavigator.Screen name = 'DirectMessage' component = {DirectMessage} />
				<FindStackNavigator.Screen name = 'GroupScreen' component = {GroupScreen} options = {groupScreenScreenOptions} />
				<FindStackNavigator.Screen name = 'MapScreen' component = {MapScreen} />
	</FindStackNavigator.Navigator>
}

const DirectMessagesStackNavigator = createStackNavigator();

export const DirectMessagesNavigator = () => {
	return <DirectMessagesStackNavigator.Navigator>
	<DirectMessagesStackNavigator.Screen name = 'DirectMessages' component = {DirectMessages} options = {directMessagesScreenOptions} />
	<DirectMessagesStackNavigator.Screen name = 'DirectMessage' component = {DirectMessage} />
	</DirectMessagesStackNavigator.Navigator>
}

const ProfileDrawerNavigator = createDrawerNavigator();

export const DrawerNavigator = () => {
	const dispatch = useDispatch()

	return <ProfileDrawerNavigator.Navigator 
	drawerContent = {props => {
			return (
				<View style={{flex:1, paddingTop: 20}}>
					<SafeAreaView forceInset={{top: 'always', horizontal:'never'}}>
						<DrawerItemList {...props} />
						<Button 
							title= 'Log ud'
							onPress={() => {
								dispatch(logOut())
							}}
						/>
					</SafeAreaView>
				</View>
			)
		}
	}
	drawerPosition={'right'}
	>
				<ProfileDrawerNavigator.Screen name = 'Profile' component = {ProfileNavigator} />
				<ProfileDrawerNavigator.Screen name = 'Indstillinger' component = {Settings} options = {settingsScreenOptions} />
	</ProfileDrawerNavigator.Navigator>
};

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
	return <ProfileStackNavigator.Navigator>
				<ProfileStackNavigator.Screen name = 'Profile' component = {Profile} options = {profileScreenOptions} />
				<ProfileStackNavigator.Screen name = 'Child' component = {ChildScreen} options = {childScreenScreenOptions} />
	</ProfileStackNavigator.Navigator>
}

const AppTabNavigator = createBottomTabNavigator();

export const TabNavigator = () => {
	return <AppTabNavigator.Navigator>
	<AppTabNavigator.Screen 
		name = 'Hjem' 
		component = {HomeScreen} 
		options = {{
			tabBarIcon: tabInfo => {
				return (
					<Ionicons 
						name='md-home' 
						size={25} 
						color='black' 
					/>
				)
			}
		}}
		/>
	<AppTabNavigator.Screen 
		name = 'Find' 
		component = {FindNaviagator} 
		options = {{
			tabBarIcon: tabInfo => {
				return (
					<Ionicons 
						name='md-search' 
						size={25} 
						color='black' 
					/>
				)
			}
		}}
		/>
	<AppTabNavigator.Screen 
		name = 'Grupper' 
		component = {GroupsNaviagator} 
		options = {{
			tabBarIcon: tabInfo => {
				return (
					<FontAwesome 
						name='group' 
						size={25} 
						color='black' 
					/>
				)
			}
		}}
		/>
		<AppTabNavigator.Screen 
		name = 'Beskeder' 
		component = {DirectMessagesNavigator} 
		options = {{
			tabBarIcon: tabInfo => {
				return (
					<Ionicons 
						name='md-mail' 
						size={25} 
						color='black' 
					/>
				)
			}
		}}
		/>
	<AppTabNavigator.Screen 
		name = 'Dig' 
		component = {DrawerNavigator} 
		options = {{
			tabBarIcon: tabInfo => {
				return (
					<Ionicons 
						name='md-person' 
						size={27} 
						color='black' 
					/>
				)
			}
		}}
		/>
	</AppTabNavigator.Navigator>
};