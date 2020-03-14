import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';

const Groups = props => {

  const [wishes, setWishes] = useState([])

  const data = 
    [
      {id: '0', title: 'Gruppe 1', description: 'Beskrivelse', price: 0},
      {id: '1', title: 'Gruppe 2', description: 'Beskrivelse', price: 0},
      {id: '2', title: 'Gruppe 3', description: 'Beskrivelse', price: 0},
    ]
  
    togglePredictHandler = () => {
      props.navigation.navigate('AddGroup');
    }

  useEffect(() => {
    props.navigation.setParams({togglePred: togglePredictHandler});
    
  }, []);

  return (
    <View style={styles.parent}>
          <FlatList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => 
              props.navigation.navigate('Chatscreen', {
              /*title: item.title,
              description: item.description,
              price: item.price */
            })} >
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