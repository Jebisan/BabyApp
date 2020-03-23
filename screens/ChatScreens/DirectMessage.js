import React from 'react';
import { SafeAreaView } from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import Fire from '../../Fire';
import {connect} from 'react-redux';
import {addChatToUser, addChatToPerson} from '../../store/actions/auth'
import NotificationCenter from '../../NotificationCenter';



class DirectMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        messages: [],
        conversationCreated: false,
    }
  }


  componentDidMount() { 
    console.log('Conversation created: '+this.props.navigation.getParam('conversationCreated'))
    console.log('chatId: ' + this.props.navigation.getParam('chatId'))
    console.log('PushToken: ' + this.props.navigation.getParam('pushToken'))

    if(this.props.navigation.getParam('conversationCreated')){
      this.setState({conversationCreated:true})
    } else {
      this.setState({conversationCreated:false})

    }
    this.get(message =>  
      this.setState(previous => ({messages: GiftedChat.append(previous.messages, message)}))
      );
    }
    



get = callback  => {
    this.messages.on('child_added', snapshot => 
    callback(this.parse(snapshot))) 
}


send = async messages =>{
  messages.forEach(item => {
      const message = {   
          text: item.text,
          timestamp: Fire.firebase.database.ServerValue.TIMESTAMP,
          user: {
              _id: this.props.userId,
              name: this.props.name,
              avatar: this.props.photoUrl
          }
      }

      const chatId = this.props.navigation.getParam('chatId')
      const personId = this.props.navigation.getParam('personId')
      const pushToken = this.props.navigation.getParam('pushToken')
      const myPushToken = this.props.navigation.getParam('pushToken')
      
      if(this.state.conversationCreated){
        fetch(`https://babyapp-ed94d.firebaseio.com/directMessages/${chatId}/messages.json?auth=${this.props.token}`,
        {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(
             
            {
              ...message
            }
           )})
      } else {

        fetch(`https://babyapp-ed94d.firebaseio.com/directMessages/${chatId}.json?auth=${this.props.token}`,
        {
           method: 'PUT',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(
             
            {
              users: [
                {userId: this.props.userId},
                {userId: personId}
              ] 
            }
           )}).then((response) => {
             this.setState({conversationCreated: true})
            return response.json();
          })
          .then((data) => {
            fetch(`https://babyapp-ed94d.firebaseio.com/directMessages/${chatId}/messages.json?auth=${this.props.token}`,
        {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(
             
            {
              ...message
            }
           )})
          });

          this.props._addChatToUser(chatId, personId)
          this.props._addChatToPerson(chatId, personId)
      }
      NotificationCenter.sendNotification('Ny beshed fra ' + message.user.name, message.text, pushToken, {type: 'DM', chatId: chatId, pushToken: myPushToken})}
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
    const chatId = this.props.navigation.getParam('chatId')
      return Fire.firebase.database().ref("directMessages/"+chatId+'/messages');
}

get user() {
    return {
        _id: this.props.userId,
        name: this.props.firstname,
        avatar: this.props.photoUrl
      }
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

    const mapDispatchToProps = (dispatch) => ({
      _addChatToUser: (chatId, userId) => dispatch(addChatToUser(chatId, userId)),
      _addChatToPerson: (chatId, personId) => dispatch(addChatToPerson(chatId, personId)),
    });

   mapStateToProps=(state) => {
      return { 
        token: state.auth.token,
        userId: state.auth.userId,
        name: state.auth.name,
        photoUrl: state.auth.photoUrl,
        pushToken: state.auth.pushToken
      }
    }

  export default connect(mapStateToProps, mapDispatchToProps)(DirectMessage)