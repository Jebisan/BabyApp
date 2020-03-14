import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import {useSelector} from 'react-redux';
import Group from '../components/Group';

const Groups = props => {
  const groups = useSelector(state => state.groups)

  const data = 
    [
      {id: '0', title: 'Gruppe 1', description: 'Beskrivelse', price: 0},
      {id: '1', title: 'Gruppe 2', description: 'Beskrivelse', price: 0},
      {id: '2', title: 'Gruppe 3', description: 'Beskrivelse', price: 0},
    ]
  


  useEffect(() => {
  console.log(groups)    
  }, []);

  return (
    <View style={styles.parent}>
          <FlatList
          data={groups}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => props.navigation.navigate('Chatscreen', {
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
    headerRight: <Button title='+' onPress={togglePredict} />
  };
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