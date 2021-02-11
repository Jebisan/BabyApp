import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, Button, SafeAreaView } from 'react-native'
import {useDispatch} from 'react-redux'
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import {logOut} from '../store/actions/auth'

//AUTH
import Login, {screenOptions as loginScreenOptions} from '../screens/Auth/Login'
import SignUp, {screenOptions as signUpScreenOptions} from '../screens/Auth/SignUp'
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
import GroupDetail, {screenOptions as groupDetailScreenOptions} from '../screens/Find/GroupDetail'
import UserDetail, {screenOptions as userDetailScreenOptions} from '../screens/Find/UserDetail'
import Find from '../screens/Find/Find'
import MapScreen from '../components/MapScreen'

//MYGROUPS
import Groups, {screenOptions as groupsScreenOptions} from '../screens/MyGroups/Groups'
import FindUsers, {screenOptions as findUsersScreenOptions} from '../screens/MyGroups/FindUsers'
import CreateGroup, {screenOptions as createGroupScreenOptions} from '../screens/MyGroups/CreateGroup'
import GroupScreen, {screenOptions as groupScreenScreenOptions} from '../screens/MyGroups/GroupScreen'
import AddUsersToGroup, {screenOptions as addUsersToGroupScreenOptions} from '../screens/MyGroups/AddUsersToGroup'
import Request from '../screens/MyGroups/Request' // SHOULD BE MOVED TO COMPONENTS. NOT A SCREEN.
import Colors from '../constants/colors';


const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
	return <AuthStackNavigator.Navigator>
		<AuthStackNavigator.Screen name = 'Login' component = {Login} options = {loginScreenOptions} />
		<AuthStackNavigator.Screen name = 'SignUp' component = {SignUp} options = {signUpScreenOptions} />
	</AuthStackNavigator.Navigator>
}

const GroupsStackNavigator = createStackNavigator();

export const GroupsNaviagator = () => {
	return <GroupsStackNavigator.Navigator screenOptions={{headerShown: false}} >
				<GroupsStackNavigator.Screen name = 'Groups' component = {Groups} options = {groupsScreenOptions} />
				<GroupsStackNavigator.Screen name = 'CreateGroup' component = {CreateGroup} options = {createGroupScreenOptions} />
				<GroupsStackNavigator.Screen name = 'FindUsers' component = {FindUsers} options = {findUsersScreenOptions} />
				<GroupsStackNavigator.Screen name = 'GroupScreen' component = {GroupScreen} options = {groupScreenScreenOptions} />
				<GroupsStackNavigator.Screen name = 'AddUsersToGroup' component = {AddUsersToGroup} options = {addUsersToGroupScreenOptions} />
				<GroupsStackNavigator.Screen name = 'GroupChat' component = {GroupChat} />
				<GroupsStackNavigator.Screen name = 'Request' component = {Request} />
				<GroupsStackNavigator.Screen name = 'UserDetail' component = {UserDetail} options = {userDetailScreenOptions} />
				<GroupsStackNavigator.Screen name = 'Child' component = {ChildScreen} options = {childScreenScreenOptions} />

	</GroupsStackNavigator.Navigator>
}

const FindStackNavigator = createStackNavigator();

export const FindNaviagator = () => {
	return <FindStackNavigator.Navigator screenOptions={{headerShown: false}} >
				<FindStackNavigator.Screen name = 'Find' component = {Find} />
				<FindStackNavigator.Screen name = 'UserDetail' component = {UserDetail} options = {userDetailScreenOptions} />
				<FindStackNavigator.Screen name = 'GroupDetail' component = {GroupDetail} options = {groupDetailScreenOptions} />
				<FindStackNavigator.Screen name = 'GroupChat' component = {GroupChat} />
				<FindStackNavigator.Screen name = 'DirectMessage' component = {DirectMessage} />
				<FindStackNavigator.Screen name = 'GroupScreen' component = {GroupScreen} options = {groupScreenScreenOptions} />
				<FindStackNavigator.Screen name = 'MapScreen' component = {MapScreen} />
				<FindStackNavigator.Screen name = 'Child' component = {ChildScreen} options = {childScreenScreenOptions} />
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
				<ProfileDrawerNavigator.Screen name = 'Indstillinger' component = {SettingsNavigator} options = {settingsScreenOptions} />
	</ProfileDrawerNavigator.Navigator>
};

const ProfileStackNavigator = createStackNavigator();

export const ProfileNavigator = () => {
	return <ProfileStackNavigator.Navigator>
				<ProfileStackNavigator.Screen name = 'Profile' component = {Profile} options = {profileScreenOptions} />
				<ProfileStackNavigator.Screen name = 'Child' component = {ChildScreen} options = {childScreenScreenOptions} />
	</ProfileStackNavigator.Navigator>
}

const SettingsStackNavigator = createStackNavigator();

export const SettingsNavigator = () => {
	return <SettingsStackNavigator.Navigator>
				<SettingsStackNavigator.Screen name = 'Settings' component = {Settings} options = {settingsScreenOptions} />
	</SettingsStackNavigator.Navigator>
}

const AppTabNavigator = createBottomTabNavigator();

export const TabNavigator = () => {
	return <AppTabNavigator.Navigator tabBarOptions={{showLabel: false}}>
	<AppTabNavigator.Screen 
		name = 'Hjem' 
		component = {HomeScreen} 
		options = {{
			tabBarIcon: ({focused}) => {
				return (
					<Ionicons 
						name='md-home' 
						size={23} 
						color={focused?'black':Colors.darkGrey} 
					/>
				)
			}
		}}
		/>
	<AppTabNavigator.Screen 
		name = 'Find' 
		component = {FindNaviagator} 
		options = {{
			tabBarIcon: ({focused}) => {
				return (
					<Ionicons 
						name='md-search' 
						size={24} 
						color={focused?'black':Colors.darkGrey} 
					/>
				)
			}
		}}
		/>
	<AppTabNavigator.Screen 
		name = 'Grupper' 
		component = {GroupsNaviagator} 
		options = {{
			tabBarIcon: ({focused}) => {
				return (
					<FontAwesome 
						name='group' 
						size={19} 
						color={focused?'black':Colors.darkGrey} 
					/>
				)
			}
		}}
		/>
		<AppTabNavigator.Screen 
		name = 'Beskeder' 
		component = {DirectMessagesNavigator} 
		options = {{
			tabBarIcon: ({focused}) => {
				return (
					<MaterialCommunityIcons
					 name="chat-processing" 
					 size={23} 
					 color={focused?'black':Colors.darkGrey} 
					 />
				)
			}
		}}
		/>
	<AppTabNavigator.Screen 
		name = 'Dig' 
		component = {DrawerNavigator} 
		options = {{
			tabBarIcon: ({focused}) => {
				return (
					<Ionicons 
						name='md-person' 
						size={24} 
						color={focused?'black':Colors.darkGrey} 
					/>
				)
			}
		}}
		/>
	</AppTabNavigator.Navigator>
};