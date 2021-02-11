import React from 'react';
import { SafeAreaView } from 'react-native';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import Fire from '../../Fire';
import {connect} from 'react-redux';
import {addChatToUser, addChatToPerson} from '../../store/actions/directMessage'
import NotificationCenter from '../../NotificationCenter';

class DirectMessage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        messages: [],
        conversationCreated: false,
        active: false
    }
  }


  componentDidMount() { 
    this.setState({active:true})

    const conversationCreated = this.props.route.params.conversationCreated;

    if(conversationCreated){
      this.setState({conversationCreated:true})
      this.readMessage();

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

      

      const chatId = this.props.route.params.chatId;
      const personId = this.props.route.params.personId; 
      const pushToken = this.props.route.params.pushToken;
      
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

          this.props._addChatToUser(chatId, personId)
          this.props._addChatToPerson(chatId, personId)
      }


      fetch(`https://babyapp-ed94d.firebaseio.com/chats/${chatId}/lastMessage.json?auth=${this.props.token}`,
      {
         method: 'PUT',
         headers: {
           'Content-Type': 'application/json'
         },
         body: JSON.stringify(
          {
            ...message,
            readBy: {
              [this.props.userId]: true,
              [personId]: false
            }
          }
         )}).then((response) => {
          return response.json();
        })

        fetch(`https://babyapp-ed94d.firebaseio.com/chatMembers/${chatId}.json?auth=${this.props.token}`,
        {
           method: 'PUT',
           headers: {
             'Content-Type': 'application/json'
           },
           body: JSON.stringify(
            {
                [this.props.userId]: true,
                [personId]: true
            }
           )}).then((response) => {
             this.setState({conversationCreated: true})
            return response.json();
          })

      NotificationCenter.sendNotification('Ny besked fra ' + message.user.name, message.text, pushToken, {type: 'DM', chatId: chatId})}
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
    const chatId = this.props.route.params.chatId
      return Fire.firebase.database().ref("directMessages/"+chatId+'/messages');
}

get user() {
    return {
        _id: this.props.userId,
        name: this.props.firstname,
        avatar: this.props.photoUrl
      }
}

readMessage = () => {
  const chatId = this.props.route.params.chatId


  fetch(`https://babyapp-ed94d.firebaseio.com/chats/${chatId}/lastMessage/readBy/${this.props.userId}.json?auth=${this.props.token}`,
  {
     method: 'PUT',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(
        true
     )})

}

componentDidUpdate(){
  if(this.state.active && this.state.conversationCreated){
    this.readMessage();
  }
}

  componentWillUnmount(){

      this.setState({active: false})    
   
  this.messages.off();
  }

    render() {
      return <SafeAreaView style={{flex:1}}> 
                <GiftedChat 
                timeFormat={'HH:mm'}
                renderBubble={props => {
                  return (
                    <Bubble
                      {...props}
                      textStyle={{
                        right: {
                          color: 'white',
                        },
                      }}
                      wrapperStyle={{
                        left: {
                          backgroundColor: '#e6e5eb',
                        },
                      }}
                    />
                  );
                }}
                showUserAvatar
                messages={this.state.messages} 
                onSend={this.send} 
                user = {this.user} 
                />
              </SafeAreaView>;}
    }

    const mapDispatchToProps = (dispatch) => ({
      // Redundant. Should be refactored to a single method. Dispatching to my DMs should not be necessary, as 
      // dms should be fetched everytime I go into my dms. Maybe just leave it.. It might explode if you touch it.. 
      _addChatToUser: (chatId, personId) => dispatch(addChatToUser(chatId, personId)),
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