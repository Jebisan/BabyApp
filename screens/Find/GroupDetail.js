import React, {useState, useEffect} from 'react';
import {Button, View, StyleSheet, Text, ScrollView ,SafeAreaView, Image, TouchableOpacity} from 'react-native';
import Fire from '../../Fire';
import {useDispatch, useSelector} from 'react-redux'
import {requestForMembership, addRequestToUser} from '../../store/actions/group'


const GroupDetail = props => {
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.userId)
  const _requests = useSelector(state => state.auth.requests)
  const groups = useSelector(state => state.groups)
  const requestsObject = props.navigation.getParam('requests')


  const groupId = props.navigation.getParam('groupId')
  const name = props.navigation.getParam('name')
  const description = props.navigation.getParam('description')
  
  const [members, setMembers] = useState([]);
  const [requesting, setRequesting] = useState(false);


  useEffect(() => {
    getMembers()
    if(requestsObject) {
      getRequests();
    }
  }, [])

  useEffect(() => {
      if(_requests.find(request => request==groupId)){
        setRequesting(true)
}  
  }, [_requests])


  const getMembers = () => {
    setMembers([]);
    const membersObject = props.navigation.getParam('members')
    const membersArray = Object.keys(membersObject).map(key => membersObject[key])

    membersArray.forEach(dm => {
        Fire.firebase.database().ref("users/"+dm).once('value').then((snapshot => {
        const obj = snapshot.val()  
        
        const user = {
          id: snapshot.key,
          name: obj.name, 
          gender: obj.gender,
          dueDate: obj.dueDate,
          city: obj.city,
          postalCode: obj.postalCode,
          birthday: obj.birthday,
          photoUrl: obj.photoUrl?obj.photoUrl:'http://criticare.isccm.org/assets/images/male_placeholder.png',
          pushToken: obj.pushToken
        }      
        setMembers(previous => [...previous, user])
      })
      )
    }) 
  }

     useEffect(() => {
      if(groups.length!==0){
        const existingGroup = groups.find(group => group.id==groupId)
    
          if(existingGroup) {
            console.log('Already enrolled in group!')
            props.navigation.goBack();

            props.navigation.navigate('GroupScreen', {
              id: existingGroup.id,
              members: existingGroup.members,
              groupName: existingGroup.name,
              admin: existingGroup.admin,
              description: existingGroup.description
            })
          } else {
            console.log('Not enrolled in Group! ')
          }
        
      } else {
        console.log('Empty groups.. ')
      }
        
    }, [])

const request = () => {
  console.log('REQUESTING..');
  dispatch(requestForMembership(userId, groupId))
  dispatch(addRequestToUser(groupId))
}

useEffect(() => {
  
}, [_requests])


  return (
    <View style={styles.parent}>
        <View style={styles.topContainer}>
          <View>
            <Image source={{ uri: 'http://criticare.isccm.org/assets/images/male_placeholder.png' }} style={styles.groupImage}></Image>  
          </View>
        <View style={styles.column}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>{description}</Text>
        </View>      
        </View>

        <View style={styles.membersContainer}>
          <Text style={styles.membersTitle}>MEDLEMMER </Text>
        <View style={styles.picturesContainer}>

            {
              members.map((member) =>
              
                <TouchableOpacity key={member.id} onPress={ () => props.navigation.navigate('UserDetail', {

                  id: member.id,
                  name: member.name,
                  gender: member.gender,
                  city: member.city,
                  postalCode: member.postalCode, 
                  birthday: member.birthday,
                  photoUrl: member.photoUrl,
                  dueDate: member.dueDate,
                  pushToken: member.pushToken

                })} > 
                    <Image source={{ uri: member.photoUrl }} style={styles.profilePicture}></Image>  
                </TouchableOpacity>
                
              )
            }
        </View>
        </View>

        {
/*
          <View style={styles.membersContainer}>
          <Text style={styles.membersTitle}>ANMODNINGER </Text>
          <View style={styles.picturesContainer}>
          
          {
            requests.map((member) =>
            
            <TouchableOpacity key={member.personId} onPress={ () => props.navigation.navigate('UserDetail', {
              
              id: member.id,
              name: member.name,
              gender: member.gender,
              city: member.city,
              postalCode: member.postalCode, 
              birthday: member.birthday,
              photoUrl: member.photoUrl,
              dueDate: member.dueDate,
              pushToken: member.pushToken
              
            })} > 
            <Image source={{ uri: member.photoUrl }} style={styles.profilePicture}></Image>  
            </TouchableOpacity> 
            )
          }
          </View>
          </View>
          
        */}
      {
        !requesting?   
        <View style={styles.requestButtonContainer} >
           <Button title='Anmod' onPress={request} />
        </View> 
        :
        <View style={styles.requestButtonContainer} >
        <Button disabled title='Anmodning sendt' onPress={request} />
     </View> 
      }
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
   flex: 1,
   paddingTop: 22,
   marginHorizontal: '5%',
  },
  topContainer: {
    flexDirection: 'row',
    fontSize: 18,
  //  borderWidth: 1
  },
  column: {
    flexDirection: 'column'
  },
  groupImage: {
    width: 50, 
    height: 50,  
    backgroundColor: 'lightgrey',
    borderRadius: 8
  },
  title: {
    fontSize: 26,
    marginLeft: 10,
  //  borderWidth: 1,
    width: "100%",
    height: 40
  },
  subTitle: {
    marginLeft: 10,
    color: 'grey',
   // borderWidth: 1,
  },
  membersContainer: {
   // borderWidth: 1,
    top: 20
  },
  membersTitle: {
    textAlign: 'left',
    backgroundColor: '#c6ffd7',
    padding: 10,
    paddingLeft: 20,
    width: 200,
    right: 20,
    
    
  },
  profilePicture: {
    width: 50, 
    height: 50,  
    borderRadius: 50,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: 'lightgrey'
  },
  picturesContainer: {
    flexDirection: 'row',
    padding: 10
  },
  addIcon: {
    padding: 3,
    marginLeft: 10
  }, 
  requestButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    borderWidth: 1,
    top: 200
  }

})

export default GroupDetail;
