import React, {useEffect, useState, useCallback} from 'react';
import {Alert, StyleSheet, FlatList, Image, View, Text, TouchableOpacity } from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Fire from '../../Fire';
import { Ionicons} from '@expo/vector-icons';
import HeaderButton from '../../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {getMembers, getRequests} from '../../store/actions/group'
import {convertDate} from '../../Shared'

const GroupScreen = props => {
  const { navigation } = props;
  const groupData = useSelector(state => state.myGroups).find(group => group.id==props.route.params.id);
  const myGroups = useSelector(state => state.myGroups);
  const userId = useSelector(state => state.auth.userId)

  
  const dispatch = useDispatch();

  const [requests, setRequests] = useState([])

  const saveGroupData = useCallback(() => {
    const data = {
      id: groupData.id,
      members: groupData.members,
      groupName: groupData.name
    };

    props.navigation.navigate('GroupChat', {
      groupData: data
    })

}, [groupData.members])

useEffect(() => {
  navigation.setOptions({
    headerTitle: groupData.name,
    headerRight: () =>

    <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      title="groupchat"
      iconName= 'ios-chatboxes'
      onPress={saveGroupData}
    />
  </HeaderButtons>
  });
}, [saveGroupData]);
  

  useEffect(() => {
    // Only fetch members if they are not already fetched and saved
    if(groupData.members.length === 0){
      dispatch(getMembers(groupData.id));
    }
      dispatch(getRequests(groupData.id));
  }, [])


  

  return (
    <View style={styles.parent}>
        <View style={styles.topContainer}>
          <View>
            <Image source={{ uri: 'http://criticare.isccm.org/assets/images/male_placeholder.png' }} style={styles.groupImage}></Image>  
          </View>
        <View style={styles.column}>
          <Text style={styles.title}>{groupData.name}</Text>
          <Text style={styles.subTitle}>{convertDate(groupData.dueDate)}</Text>
          <Text style={styles.subTitle}>{groupData.description}</Text>
        </View>      
        </View>

        <View style={styles.membersContainer}>
          <Text style={styles.membersTitle}>MEDLEMMER </Text>
        <View style={styles.picturesContainer} >
        
            {groupData.members.map((member) =>

                <TouchableOpacity key={member.id} onPress={() => props.navigation.navigate('UserDetail', {
                id: member.id,
                name: member.name,
                gender: member.gender,
                dueDate: member.dueDate,
                city: member.city,
                postalCode: member.postalCode,
                birthday: member.birthday,
                photoUrl: member.photoUrl,
                pushToken: member.pushToken,
                children: member.children
              })}  > 
                  <Image source={{ uri: member.photoUrl }} style={styles.profilePicture}></Image>  
              </TouchableOpacity>

              )}

              <TouchableOpacity onPress={ () => Alert.alert('Not supported at the moment') /*() => props.navigation.navigate('AddUsersToGroup', {
                groupData 
              })*/} >
                <Ionicons style={styles.addIcon} name='ios-add-circle-outline' size={43} />
              </TouchableOpacity>

        </View>
        </View>


        <View style={styles.membersContainer}>
        <Text style={styles.membersTitle}>ANMODNINGER ({groupData.requests.length})</Text>
      <View style={styles.picturesContainer} >
          {groupData.requests.map((request) =>
            <TouchableOpacity key={request.personId} onPress={() => props.navigation.navigate('Request', {
              requestData: request,

              groupId: groupData.id,
              groupName: groupData.name,
              groupAdmin: groupData.admin,

            })}>
              <View key={request.id} > 
                  <Image source={{ uri: request.photoUrl }} style={styles.profilePicture}></Image>  
              </View>
              </TouchableOpacity>
              
            )}
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

export default GroupScreen;
