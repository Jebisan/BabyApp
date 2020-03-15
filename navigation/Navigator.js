import React from 'react';
import {createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator, createDrawerNavigator, DrawerNavigator, SafeAreaView, DrawerItems } from 'react-navigation';
import Groups from '../screens/Groups';
import Profile from '../screens/Profile';
import Find from '../screens/Find';
import FindUsers from '../screens/FindUsers';
import AddGroup from '../screens/AddGroup';
import UserDetail from '../screens/UserDetail'
import GroupDetail from '../screens/GroupDetail'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Chatscreen from '../screens/ChatScreen';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import DirectMessages from '../screens/DirectMessages';
import Settings from '../screens/Settings';
import StartUpScreen from '../screens/StartUpScreen';
import {useDispatch} from 'react-redux'
import { View, Button } from 'react-native';
import {logOut} from '../store/actions/auth'
import CreateAdditionalInformation from '../screens/Auth/CreateAdditionalInformation';

const AuthStack = createSwitchNavigator({
    Login: Login,
    SignUp: SignUp,
}
);

const ProfileStack = createStackNavigator({
    Profile: Profile, 
    DirectMessages: {screen: DirectMessages},
    Chatscreen: {screen: Chatscreen}

}
);

const SettingsStack = createStackNavigator({
    Settings: Settings, 
}
);

const GroupsStack = createStackNavigator({
    Groups: Groups,
    Chatscreen: Chatscreen,
    AddGroup: AddGroup,
    FindUsers: FindUsers
}
);

const FindStack = createStackNavigator({
    Find: Find,
    UserDetail: UserDetail,
    GroupDetail: GroupDetail,
    Chatscreen: Chatscreen,

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