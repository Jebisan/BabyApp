import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { View, Button, SafeAreaView } from 'react-native'
import {useDispatch} from 'react-redux'
import { Ionicons, FontAwesome } from '@expo/vector-icons'
import {logOut} from '../store/actions/auth'

//AUTH
import StartUpScreen from '../screens/StartUpScreen'
import Login from '../screens/Auth/Login'
import SignUp from '../screens/Auth/SignUp'
import CreateAdditionalInformation from '../screens/Auth/CreateAdditionalInformation'

//HOME
import HomeScreen from '../screens/Home/HomeScreen'

//CHATSCREENS
import GroupChat from '../screens/ChatScreens/GroupChat'
import DirectMessage from '../screens/ChatScreens/DirectMessage'

//PROFILE
import Settings from '../screens/Profile/Settings'
import Profile, {screenOptions as profileScreenOptions} from '../screens/Profile/Profile'
import DirectMessages, {screenOptions as directMessagesScreenOptions} from '../screens/Profile/DirectMessages'

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
import Request from '../screens/Group/Request' // SHOULD BE MOVED TO COMPONENTS. NOT SCREEN.

/*
const AuthStack = createSwitchNavigator({
	Login: Login,
	SignUp: SignUp,
}
)
*/

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
	return <AuthStackNavigator.Navigator>
		<AuthStackNavigator.Screen name = 'Login' component = {Login} />
		<AuthStackNavigator.Screen name = 'SignUp' component = {SignUp} />
	</AuthStackNavigator.Navigator>
}

const ProfileStackNavigator = createStackNavigator();

export const ProfileStack = () => {
return <ProfileStackNavigator.Navigator>
			<ProfileStackNavigator.Screen name = 'Profile' component = {Profile} options = {profileScreenOptions} />
			<ProfileStackNavigator.Screen name = 'DirectMessages' component = {DirectMessages} options = {directMessagesScreenOptions} />
			<ProfileStackNavigator.Screen name = 'DirectMessage' component = {DirectMessage} />
</ProfileStackNavigator.Navigator>
};
/*
const ProfileStack = createStackNavigator({
	Profile: Profile, 
	DirectMessages: {screen: DirectMessages},
	DirectMessage: {screen: DirectMessage}
}
)
*/

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
/*
const GroupsStack = createStackNavigator({
	Groups: Groups,
	CreateGroup: CreateGroup,
	FindUsers: FindUsers,
	GroupChat: GroupChat,
	GroupScreen: GroupScreen,
	AddUsersToGroup: AddUsersToGroup,
	Request: Request,
	UserDetail: UserDetail
}
)
*/

const FindStackNavigator = createStackNavigator();

export const FindNaviagator = () => {
	return <FindStackNavigator.Navigator>
				<FindStackNavigator.Screen name = 'Find' component = {Find} />
				<FindStackNavigator.Screen name = 'UserDetail' component = {UserDetail} />
				<FindStackNavigator.Screen name = 'GroupDetail' component = {GroupDetail} />
				<FindStackNavigator.Screen name = 'DirectMessage' component = {DirectMessage} />
				<FindStackNavigator.Screen name = 'GroupScreen' component = {GroupScreen} options = {groupScreenScreenOptions} />
				<FindStackNavigator.Screen name = 'MapScreen' component = {MapScreen} />
	</FindStackNavigator.Navigator>
}
/*
const FindStack = createStackNavigator({
	Find: Find,
	UserDetail: UserDetail,
	GroupDetail: GroupDetail,
	DirectMessage: DirectMessage,
	GroupScreen: GroupScreen,
	Map: MapScreen
}
)
*/


const ProfileDrawerNavigator = createDrawerNavigator();

export const ProfileNavigator = () => {
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
	drawerContentOptions = {{
		drawerPosition:'left'
	}} >
				<ProfileDrawerNavigator.Screen name = 'Profile' component = {ProfileStack}/>
				<ProfileDrawerNavigator.Screen name = 'Indstillinger' component = {Settings}/>
	</ProfileDrawerNavigator.Navigator>
};

/*
const AppDrawerNavigator = createDrawerNavigator(
	{
		Profil: {screen: ProfileStack},
		Indstillinger: {screen: Settings},
	}, 
	{
		contentOptions: {
			drawerPosition:'left'
		},
		contentComponent: ''
	}
)
*/

const AppTabNavigator = createBottomTabNavigator();

export const TabNavigator = () => {
	return <AppTabNavigator.Navigator>
	<AppTabNavigator.Screen 
		name = 'Home' 
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
		name = 'Dig' 
		component = {ProfileNavigator} 
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
}
/*
const AppTabNavigator = createBottomTabNavigator({
	'Home': {screen: HomeScreen, navigationOptions: {
		tabBarIcon: tabInfo => {
			return (
				<Ionicons 
					name='md-home' 
					size={25} 
					color='black' 
				/>
			)
		}
	}
	},
	'Find': {screen: FindStack, navigationOptions: {
		tabBarIcon: tabInfo => {
			return (
				<Ionicons 
					name='md-search' 
					size={25} 
					color='black' 
				/>
			)
		}
	}
	},
	'Grupper': {screen: GroupsStack, navigationOptions: {
		tabBarIcon: tabInfo => {
			return (
				<FontAwesome 
					name='group' 
					size={25} 
					color='black' 
				/>
			)
		}
	}
	},
	Dig: {screen: AppDrawerNavigator, navigationOptions: {
		tabBarIcon: tabInfo => {
			return (
				<Ionicons 
					name='md-person' 
					size={27} 
					color='black' 
				/>
			)
		}
	}
	},
});
*/
/*
const AppSwitchNavigator = createSwitchNavigator({
	StartUp: {screen: StartUpScreen},
	AuthStack: {screen: AuthStack}, 
	CreateAdditionalInformation: {screen: CreateAdditionalInformation},
	MainScreen: {screen: AppNavigator},
});
export default createAppContainer (AppSwitchNavigator)
*/