import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import {useSelector} from 'react-redux';
import User from '../../components/User';
import Fire from '../../Fire';

const DirectMessages = props => {

  const directMessages = useSelector(state => state.directMessages)
  const userId = useSelector(state => state.auth.userId)

  
  const [users, setUsers] = useState([]);

  useEffect(() => {
      getPeople();
  }, []);




  const getPeople = () => {

    directMessages.forEach(dm => {
      Fire.firebase.database().ref("users/"+dm.userId).once('value').then((snapshot => {
        const obj = snapshot.val()        
        
        const user = {
          id: snapshot.key,
          name: obj.name, 
          photoUrl: obj.photoUrl,
          chatId: dm.chatId
        }

        setUsers(previous => [...previous, user])
      })
      )
    }) 
  }

  return (
    <View style={styles.parent}>   
    {
        <FlatList
        data={users}
        keyExtractor={item => item.id}
        renderItem={({item}) =>
        <TouchableOpacity onPress={() => props.navigation.navigate('DirectMessage', {
          conversationCreated: true,
          personId: item.userId,
          chatId: item.chatId
        })}
        >
        <User  
        name={item.name}
        photoUrl={item.photoUrl}
        />
        </TouchableOpacity>
        
      }
      />
      
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