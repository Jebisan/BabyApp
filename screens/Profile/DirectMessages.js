import React, {useEffect, useState, useReducer} from 'react';
import {Button, StyleSheet, FlatList, View, Text, TouchableOpacity } from 'react-native';
import {useSelector} from 'react-redux';
import Chat from '../../components/Chat';
import Fire from '../../Fire';

const initialChats = [];

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_CHAT_INFO':
          return [...state, action.data]

    case 'ADD_CHAT_INFO_2': 
    return state.map(chat => {
      if (chat.id === action.id) {
        return {
          ...chat,
          ...action.newData
        }
        ;
      } else {
        return chat;
      };
    });

    default:
      return state;
  }
};


const DirectMessages = props => {
  const [chats, dispatch] = useReducer(
    chatReducer,
    initialChats
  );

  const directMessages = useSelector(state => state.directMessages)
  const userId = useSelector(state => state.auth.userId)


  useEffect(() => {
      getChats();
  }, []);




  const getChats = () => {
    directMessages.forEach(dm => {
      Fire.firebase.database().ref("chats/"+dm).once('value').then((snapshot => {
        dispatch({ type: 'ADD_CHAT_INFO', data: {
        id: snapshot.key,
        lastMessage: snapshot.val().lastMessage.text,
        timestamp: snapshot.val().lastMessage.timestamp
        } });

        const membersArray = Object.keys(snapshot.val().members).map(key => {
          return key
        });
        const user = membersArray.find(user => user!==userId);
      
        addUserInfoToChat(user, snapshot.key)

      }))
    })
  }

  const addUserInfoToChat = (user, groupId) => {
    Fire.firebase.database().ref("users/"+user).once('value').then((snapshot => {
      dispatch({ type: 'ADD_CHAT_INFO_2', id: groupId, newData: {
        name: snapshot.val().name,
        photoUrl: snapshot.val().photoUrl,
        pushToken: snapshot.val().pushToken
      } 
      });
     }))
  }

  return (
    <View style={styles.parent}>   
    {
      
        <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({item}) =>
        <TouchableOpacity onPress={() => props.navigation.navigate('DirectMessage', {
          conversationCreated: true,
          chatId: item.id,
          pushToken: item.pushToken
        })}
        >
        <Chat  
        name={item.name}
        photoUrl={item.photoUrl}
        lastMessage = {item.lastMessage}
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