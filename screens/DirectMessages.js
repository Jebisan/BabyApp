import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';


const DirectMessages = props => {

  return (
    <View style={styles.parent}>
      <Text>Hello from DMs!</Text>
         
      {/*
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
      */ 
    }
    </View>

  );
};

export default DirectMessages;


DirectMessages.navigationOptions = navigationData => {

  return {
    headerTitle: 'DMs',
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