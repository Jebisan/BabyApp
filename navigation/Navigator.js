import React from 'react';
import { View, Button } from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator, DrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import {useDispatch} from 'react-redux'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {logOut} from '../store/actions/auth'

//AUTH
import StartUpScreen from '../screens/StartUpScreen';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import CreateAdditionalInformation from '../screens/Auth/CreateAdditionalInformation';

//CHATSCREENS
import GroupChat from '../screens/ChatScreens/GroupChat';
import DirectMessage from '../screens/ChatScreens/DirectMessage';

//PROFILE
import Settings from '../screens/Profile/Settings';
import Profile from '../screens/Profile/Profile';
import DirectMessages from '../screens/Profile/DirectMessages';

//FIND
import GroupDetail from '../screens/Find/GroupDetail'
import UserDetail from '../screens/Find/UserDetail'
import Find from '../screens/Find/Find';

//GROUPS
import Groups from '../screens/Group/Groups';
import FindUsers from '../screens/Group/FindUsers';
import CreateGroup from '../screens/Group/CreateGroup';
import GroupScreen from '../screens/Group/GroupScreen';
import AddUsersToGroup from '../screens/Group/AddUsersToGroup';
import Request from '../screens/Group/Request';

const AuthStack = createSwitchNavigator({
    Login: Login,
    SignUp: SignUp,
}
);

const ProfileStack = createStackNavigator({
    Profile: Profile, 
    DirectMessages: {screen: DirectMessages},
    DirectMessage: {screen: DirectMessage}

}
);

const SettingsStack = createStackNavigator({
    Settings: Settings, 
}
);

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
);

const FindStack = createStackNavigator({
    Find: Find,
    UserDetail: UserDetail,
    GroupDetail: GroupDetail,
    DirectMessage: DirectMessage

}
);

const AppDrawerNavigator = createDrawerNavigator(
    {
    Profile: {screen: ProfileStack},
    Settings: {screen: SettingsStack},
}, 
{
    contentOptions: {
        drawerPosition:'left'
    },
    contentComponent: props => {
        const dispatch = useDispatch();
        return (
            <View style={{flex:1, paddingTop: 20}}>
              <SafeAreaView forceInset={{top: 'always', horizontal:'never'}}>
                  <DrawerItems {...props} />
            <Button 
            title= 'Log ud'
            onPress={() => {
                dispatch(logOut());
            }}
            />
            </SafeAreaView>
            </View>
        )
    }
    
}

);


const AppTabNavigator = createBottomTabNavigator({
'Find': {screen: FindStack, navigationOptions: {
        tabBarIcon: tabInfo => {
            return (
                <Ionicons 
                name='md-search' 
                size={25} 
                color='black' 
                />
            );
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


    Profil: {screen: AppDrawerNavigator, navigationOptions: {
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


const AppSwitchNavigator = createSwitchNavigator({
    StartUp: {screen: StartUpScreen},
    AuthStack: {screen: AuthStack}, 
    CreateAdditionalInformation: {screen: CreateAdditionalInformation},
    MainScreen: {screen: AppTabNavigator},
})







export default createAppContainer (AppSwitchNavigator);