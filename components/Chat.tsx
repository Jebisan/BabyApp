import React from 'react';
import {View, StyleSheet, Text, Image } from 'react-native';
import moment from 'moment';
import {Entypo} from '@expo/vector-icons'
import { useEffect, useState } from 'react';

type Props = {
  timestamp: Date;
  lastMessage: string;
  photoUrl: string;
  name: string;
  read: boolean
}

const Chat: React.FC<Props> = ({timestamp, lastMessage, photoUrl, name, read}) => {
  
  const time = moment(timestamp).fromNow();  
  const [message, setMessage] = useState(lastMessage)

useEffect(() => {
  if(lastMessage.length>10){
    setMessage(lastMessage.slice(0,12) + ' (...)')
 } else {
   setMessage(lastMessage);
 }
}, [lastMessage])
  
  return (
    <View style = {styles.parent}>
      <View style = {styles.wishContainer}>

      <View style={styles.horizontalContainer}>
      <View style={styles.verticalContainer}>
        <View style={styles.imageContainer}>
          <Image style={{width: 50, height: 50, borderRadius: 400/ 2}} source={ photoUrl?{uri: photoUrl }: {uri: 'http://criticare.isccm.org/assets/images/male_placeholder.png' }} />
      </View>

      </View>

      <View style={styles.verticalContainer}>
      
      {read?
        <Text style= {styles.name}>{name}</Text>

      :
      <Text style= {styles.name2}>{name}</Text>
    }
      
        <View style={styles.message}>



        {read?
          <Text  style={styles.oldMessage}>{message}</Text>

        :
        <Text  style={styles.newMessage}>{message}</Text>
      }
        <Text style= {styles.time}>· {time}</Text>
        </View>
      </View>
        {
          read? null :<View style={styles.unreadSymbol}>
          <Entypo name='dot-single' color={'darkred'} size={40} />
       </View>
        }
   
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  } ,
  name: {
    fontSize: 20,
    fontWeight: '200'
  },
  name2: {
    fontSize: 20,
    fontWeight: '400'
 },
  oldMessage: {
    fontSize: 14,
    color: 'grey',
    paddingTop: 7,
    paddingLeft: 3,
    fontWeight: '200'
  },
  newMessage: {
    fontSize: 14,
    color: 'black',
    paddingTop: 7,
    paddingLeft: 3,
    fontWeight: '400'

  },
  wishContainer: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey',
    height: 75,
    width: 350,
  },
  horizontalContainer: {
    flexDirection: 'row'
  },
  verticalContainer: {
    flexDirection: 'column',
    padding: 7, 
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 310,
    bottom: 35,
    height: 20,
    width: 20,

  },
  imageContainer: {
    borderRadius: 400/ 2,
    borderWidth: 1,
    borderColor: 'lightgrey'
  },
  message: {
    flexDirection: 'row'
  },
  time: {
    fontSize: 14,
    color: 'grey',
    paddingTop: 7,
    paddingLeft: 3,
    fontWeight: '200'
  },
  unreadSymbol: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 320,
    marginTop: 13
  }
});

export default Chat;
