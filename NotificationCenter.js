import React, {Component} from 'react'

class NotificationCenter extends Component {
  constructor(props) {
    super(props)
    }
        
    sendNotification = async(title, body, pushToken, _data) => {
    const message = {
      to: pushToken,
      sound: 'default',
      title: title,
      body: body, 
      data: _data
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
    const data = response._bodyInit;
    //console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
  }
} 

export default new NotificationCenter();