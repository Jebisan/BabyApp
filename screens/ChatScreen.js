import React from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from '../Fire';
import {connect} from 'react-redux';


class Chatscreen extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }
  }
  

  get user() {
    return {
      _id: this.props.userId,
      name: this.props.firstname,
      avatar: this.props.photoUrl
    }
  }


send = messages => {
  messages.forEach(item => {
      const message = {   
          text: item.text,
          timestamp: Fire.firebase.database.ServerValue.TIMESTAMP,
          user: {
              _id: this.user._id,
              name: this.user.name,
              avatar: this.user.avatar
          }
      }

          
fetch(
`https://babyapp-ed94d.firebaseio.com/messages.json?auth=${this.props.token}`,
{
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(
     message
  )
}
)})
  }

  componentDidMount() { 
      Fire.get(message => 
      this.setState(previous => ({
      messages: GiftedChat.append(previous.messages, message)
    }))
    );
  }

  componentWillUnmount(){
    Fire.off();
  }


    render() {
      return <SafeAreaView style={{flex:1}}> 
                <GiftedChat 
                
                messages={this.state.messages} 
                onSend={this.send} 
                user = {this.user} 
                />
              </SafeAreaView>;}
    }

   mapStateToProps=(state) => {
      return { 
        state: state.auth,
        userId: state.auth.userId,
        token: state.auth.token,
        firstname: state.auth.firstname,
        photoUrl: state.auth.photoUrl,
        
      }
    }

  export default connect(mapStateToProps)(Chatscreen)