import React, {useEffect} from 'react';
import {Button, StyleSheet, FlatList, View, TouchableOpacity } from 'react-native';
import {useSelector} from 'react-redux';
import Group from '../components/Group';

import HeaderButton from '../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

const Groups = props => {
  const groups = useSelector(state => state.groups)

  useEffect(() => {
    console.log(groups)
  }, [])


  return (
    <View style={styles.parent}>
          <FlatList
          data={groups}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => props.navigation.navigate('GroupChat', {
              id: item.id
            })}
            >
          <Group
          name = {item.name}
          description = {item.description}
          city = {item.city}
          postalCode = {item.postalCode}
          photoUrl = {item.photoUrl}

          />
            </TouchableOpacity>

        }
    />
    </View>

  );
};

export default Groups;


Groups.navigationOptions = navigationData => {
  const togglePredict = navigationData.navigation.getParam('togglePred');

  return {
    headerTitle: 'Groups',
    headerRight: 

    <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      title="add"
      iconName= 'ios-add'
      onPress={() => navigationData.navigation.navigate('AddGroup')}
    />
  </HeaderButtons>  };
};


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