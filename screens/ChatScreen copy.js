import React, {useState, useEffect} from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView, StyleSheet, View, Text } from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from '../Fire';

const Chatscreen = () =>  {

  const [messages, setMessages] = useState([])
  const [user, setUser] = useState({_id: '123',name: 'Jebi',})


  useEffect(() => {
    Fire.get(message => 
      setMessages(previous => GiftedChat.append(previous.messages, message))
    );

    return () => {
      Fire.off();
    }

  }, []);

      return <SafeAreaView style={{flex:1}}> 
                <GiftedChat  messages={messages} onSend={Fire.send} user ={user} />
              </SafeAreaView>;}
    
export default Chatscreen