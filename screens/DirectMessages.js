import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import {useSelector} from 'react-redux';
import User from '../components/User';
import Fire from '../Fire';

const DirectMessages = props => {

  const directMessages = useSelector(state => state.directMessages)

  const [people, setPeople] = useState([]);

  useEffect(() => {
      //getPeople();
  }, []);


  const getPeople = () => {
    
    directMessages.forEach(dm => {

      Fire.firebase.database().ref("users/"+dm.dmPerson).once('value').then((snapshot => {
        setPeople(prevPeople => prevPeople.concat( {id: snapshot.key ,...snapshot.val()} ))
      })
      )
    })
    
  }

  return (
    <View style={styles.parent}>   
        <FlatList
        data={directMessages}
        keyExtractor={item => item.dmPerson}
        renderItem={({item}) =>
        <TouchableOpacity onPress={() => props.navigation.navigate('Chatscreen', {
          id: item.dmPerson,
          dm: true,
        })}
        >
        <User  
        name={item.name}
        photoUrl={item.photoUrl}
        />
        </TouchableOpacity>
        
      }
      />
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