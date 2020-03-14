import React, { useEffect } from 'react';
import { Button, View, StyleSheet, Image, Text } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';
import {useSelector} from 'react-redux';
import ImagePicker from '../components/ImagePicker';

const Profile = props => {

  const firstname = useSelector(state => state.auth.firstname);
  const lastname = useSelector(state => state.auth.lastname);
  const email = useSelector(state => state.auth.email);


  return (
    <View style = {styles.parent}>
      <View style={styles.verticalContainer}>
    <ImagePicker/>
      </View>
      <Text style={styles.nameText}>{firstname} {lastname}</Text>
      <Text style={styles.nameText}>{email}</Text>
    </View>
  );
};


Profile.navigationOptions = navigationData => {
  return {
    headerTitle: 'Profile',
    headerLeft:  <Ionicons name="md-menu" size={22}  onPress={() => navigationData.navigation.openDrawer()} />,
    headerRight: <MaterialIcons name="markunread" size={22} onPress={() => navigationData.navigation.navigate('DirectMessages')} />,
  };
};

const styles = StyleSheet.create({
  parent: {
    paddingTop: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  verticalContainer: {
    flexDirection: 'column',
    padding: 7, 
  }, 
  nameText: {
    paddingTop: 10,
    fontSize: 20,
  },
});

export default Profile;
