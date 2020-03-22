import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Text, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import Fire from '../../Fire';
import User from '../../components/User';
import {Ionicons} from '@expo/vector-icons';
import {addUserToGroup, addGroupToUser} from '../../store/actions/auth';
import {useDispatch, useSelector} from 'react-redux';


const AddUsersToGroup = props => {

  const groupData = props.navigation.getParam('groupData')
  
  const [users, setUsers] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState([])
  const [searchText, setSearchText] = useState('');
  const userId = useSelector(state => state.auth.userId)
  const dispatch = useDispatch();

  
  const _createGroup = useCallback(() => {
  const selectedUserIds = []
  selectedUsers.forEach(user => {
      selectedUserIds.push(user.id)
    });

    selectedUserIds.forEach(selectedUserId => {
      dispatch(addUserToGroup(selectedUserId, groupData.id))
      dispatch(addGroupToUser(selectedUserId, groupData.id))
  });

  props.navigation.goBack();

}, [selectedUsers])


useEffect(() => {
  props.navigation.setParams({save: _createGroup});
}, [_createGroup]);


  useEffect(() => {    
    getUsers();
  }, []);


  useEffect(() => {

    if(searchText!==''){
      let tempArray = [];
      users.forEach(user => {
        if(user.name.includes(searchText)){
          tempArray.push(user);
          setFilteredUsers(tempArray);
        }
      });

    }
  }, [searchText]);


  const getUsers = () => {
    Fire.users.once('value').then((snapshot) =>{
     obj = snapshot.val()
     var result = Object.keys(obj).map((value) => {
       return {id: value,  ...obj[value]};
     });
     setUsers(result)
   }).catch(error => {
     console.log(error)
   });
};

const userTappedHandler = (_user) => {
  if(selectedUsers.find(user => user.id === _user.id)){
    const updated = selectedUsers.filter((sitem) => sitem.id !== _user.id);
    setSelectedUsers(updated);
  } else {
    let tempArray = [];
    tempArray.push(...selectedUsers,_user);
    setSelectedUsers(tempArray);
  }
}



  return (
    <View style = {styles.parent}>
<View>

<View style={styles.searchBar}>

<TextInput
style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
onChangeText={text => setSearchText(text)}
value={searchText}
placeholder='Søg efter brugere'
/>

</View>

<View style={styles.buttonGroupContainer}>
<FlatList
data={filteredUsers}
renderItem={({ item }) => 
<TouchableOpacity onPress={() => userTappedHandler(item)}>
    <User
    key={item.id}
    name={item.name}
    gender={item.gender}
    city={item.city}
    postalCode={item.postalCode}
    photoUrl={item.photoUrl}
    />

    <View style={styles.icon}>


    {selectedUsers.find(user => user.id === item.id)?
      <Ionicons name="md-checkmark" size={25} color="green" />
      :null}

    </View>

    </TouchableOpacity>
  }
keyExtractor={item => item.id}
/>
</View>

</View>
    </View>
  );
};

AddUsersToGroup.navigationOptions = navigationData => {
  const save = navigationData.navigation.getParam('save');

  return {
    headerTitle: 'Find brugere',
    headerRight: <Button title='Tilføj' onPress={save} />
  };
};

const styles = StyleSheet.create({
  parent: {
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
  } ,
  headerText: {
    fontSize: 30,
    fontWeight: "bold"
  },
  textInput: { 
    height: 40, 
    borderColor: 'lightgray', 
    borderWidth: 1,
    width: 230,
    padding: 10
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    left: 310,
    bottom: 60,
    height: 20,
    width: 20,
  },

  information: {
    borderWidth:1
  },
  buttonGroupContainer: {
    top: 60,
  },
  searchBar: {
    top: 30,
    width: 300,
    borderWidth: 1,
    borderColor: 'lightgrey'
  }
});

export default AddUsersToGroup;
