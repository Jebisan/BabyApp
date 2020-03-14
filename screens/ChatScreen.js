import React from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from '../Fire';
import {connect} from 'react-redux';


class Chatscreen extends React.Component {
  constructor(props) {
    super(props)
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
  const id = this.props.navigation.getParam('id');

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
`https://babyapp-ed94d.firebaseio.com/groups/${id}/messages.json?auth=${this.props.token}`,
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

  parse = message => {
    const {user, text, timestamp} = message.val()
    const {key: _id} = message
    const createdAt = new Date(timestamp)

    return {
        _id,
        createdAt,
        text,
         user
    };
};

  get messages() {
    const id = this.props.navigation.getParam('id');
    return Fire.firebase.database().ref("groups/"+id+"/messages");
}

  get = callback  => {
    this.messages.on('child_added', snapshot => callback(this.parse(snapshot)));
}

  componentDidMount() { 
    console.log(this.props.navigation.getParam('id'))
      this.get(message => 
      this.setState(previous => ({
      messages: GiftedChat.append(previous.messages, message)
    }))
    );
  }

  get users() {
    return Fire.firebase.database().ref("users");
}

  off() {
    this.messages.off();
    this.users.off();
}


  componentWillUnmount(){
    this.off();
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