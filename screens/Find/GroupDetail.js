import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView ,SafeAreaView, Image, TouchableOpacity} from 'react-native';
import Fire from '../../Fire';

const GroupDetail = props => {

  const name = props.navigation.getParam('name')
  const description = props.navigation.getParam('description')
  const [members, setMembers] = useState([]);

  useEffect(() => {
    getMembers()
  }, [])


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
  }

})

export default GroupDetail;
