import React from 'react';
import { Platform, KeyboardAvoidingView, SafeAreaView, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from '../../Fire';
import {connect} from 'react-redux';
import NotificationCenter from '../../NotificationCenter';



class GroupChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      members: []
    }
  }

  get user() {
    return {
      _id: this.props.userId,
      name: this.props.firstname,
      avatar: this.props.photoUrl
    }
  }

  getMembers = () => {
    const members = this.props.navigation.getParam('members')
    members.forEach(member => {

      Fire.firebase.database().ref("users/"+member).once('value').then((snapshot => {
        const obj = snapshot.val()    
        
        const member = {
          id: snapshot.key,
          name: obj.name, 
          photoUrl: obj.photoUrl,
          pushToken: obj.pushToken,
        }
        this.setState(prevState => ({members: [...prevState.members, member]}))
        
      })
      );
    });
  }




send = messages =>{
const groupId = this.props.navigation.getParam('id')
const groupName = this.props.navigation.getParam('groupName')

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
        `https://babyapp-ed94d.firebaseio.com/groupMessages/${groupId}/messages.json?auth=${this.props.token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(
             message
          )}) 

          this.state.members.forEach(member => {
            NotificationCenter.sendNotification('Ny besked fra ' + message.user.name + " i "+ groupName, message.text, member.pushToken)
          });
        }    
  )};

  

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
    const groupId = this.props.navigation.getParam('id');

      return Fire.firebase.database().ref("groupMessages/"+groupId+"/messages");
    }

  get = callback  => {
    this.messages.on('child_added', snapshot => callback(this.parse(snapshot)));
}

  componentDidMount() { 

    this.getMembers();
      this.get(message => 
      this.setState(previous => ({
      messages: GiftedChat.append(previous.messages, message)
    }))
    );
  }



  componentWillUnmount(){
    this.messages.off();
  }


    render() {
      return <SafeAreaView style={{flex:1}}> 
                <GiftedChat 
                showUserAvatar
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
        name: state.auth.name,
        photoUrl: state.auth.photoUrl,
        
      }
    }

  export default connect(mapStateToProps)(GroupChat)