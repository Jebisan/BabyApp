import React from 'react';
import { View, Button } from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator, DrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import {useDispatch} from 'react-redux'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {logOut} from '../store/actions/auth'
import Groups from '../screens/Groups';
import Profile from '../screens/Profile/Profile';
import Find from '../screens/Find/Find';
import FindUsers from '../screens/CreateGroup/FindUsers';
import AddGroup from '../screens/CreateGroup/AddGroup';
import UserDetail from '../screens/Find/UserDetail'
import GroupDetail from '../screens/Find/GroupDetail'
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import DirectMessages from '../screens/Profile/DirectMessages';
import Settings from '../screens/Profile/Settings';
import StartUpScreen from '../screens/StartUpScreen';
import CreateAdditionalInformation from '../screens/Auth/CreateAdditionalInformation';
import DirectMessage from '../screens/ChatStreens/DirectMessage';
import GroupChat from '../screens/ChatStreens/GroupChat';

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
    AddGroup: AddGroup,
    FindUsers: FindUsers,
    GroupChat: GroupChat
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