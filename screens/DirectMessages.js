import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import {useSelector} from 'react-redux';
import User from '../components/User';
import Fire from '../Fire';

const DirectMessages = props => {

  const directMessages = useSelector(state => state.directMessages)
  const userId = useSelector(state => state.auth.userId)

  
  const [dms, setDms] = useState([]);

  useEffect(() => {
      getPeople();
  }, []);


  const getPeople = () => {
    console.log(directMessages);
/*
    directMessages.forEach(dm => {
      Fire.firebase.database().ref("directMessages/"+dm).once('value').then((snapshot => {
        const obj = snapshot.val().users
        var result = Object.keys(obj).map((value) => {
          return {key: value,  ...obj[value]};
        });

        const newObj = {
          id: dm, 
          messages: snapshot.val().messages,
          user: result.find(member => member.key !==userId)
        }
        setDms([newObj])
        console.log(newObj)
        
      })
      )
    }) 
*/
  }

  return (
    <View style={styles.parent}>   
    {
        <FlatList
        data={directMessages}
        keyExtractor={item => item.chatId}
        renderItem={({item}) =>
        <TouchableOpacity onPress={() => props.navigation.navigate('DirectMessage', {
          conversationCreated: true,
          personId: item.userId,
          chatId: item.chatId
        })}
        >
        <User  
        name={item.userId}
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