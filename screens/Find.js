import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View, SafeAreaView, FlatList, TouchableOpacity} from "react-native";
import cityData from '../cities';
import User from '../components/User';
import Group from '../components/Group';
import Fire from '../Fire';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {ButtonGroup} from 'react-native-elements';
import { useSelector } from 'react-redux';



 const Find = (props) => {
   
  const userId = useSelector(state => state.auth.userId);

  const [searchText, setSearchText] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [city, setCity] = useState('')
  const [users, setUsers] = useState([])
  const [groups, setGroups] = useState([])
  const [filteredUsers, setFilteredUsers] = useState([])
  const [filteredGroups, setFilteredGroups] = useState([])
  const [textFieldInFocus, setTextFieldInFocus] = useState(false)
 
  useEffect(() => {
   getUsers();
   getGroups();
  }, [])

  const getUsers = () => {
    Fire.users.once('value').then((snapshot) =>{
     obj = snapshot.val()
     var result = Object.keys(obj).map((value) => {
       return {key: value,  ...obj[value]};
     });
     filteredResult = result.filter(user => user.key!==userId)
     setUsers(filteredResult)
   }).catch(error => {
     console.log(error);
   });
};

const getGroups = () => {
  Fire.groups.once('value').then((snapshot) =>{
  
    obj = snapshot.val()
    var result = Object.keys(obj).map((value) => {
      return {key: value,  ...obj[value]};
    });
    setGroups(result)

  }).catch(error => {
    console.log(error);
  });
}

  useEffect(() => {    
    if(selectedIndex==0){
      let tempUserArray = [] 
      users.forEach(user => {
        if(user.city.includes(city.name)){
          tempUserArray.push(user);
        }
      });
    setFilteredUsers(tempUserArray)
    }

    if(selectedIndex==1){
      let tempGroupArray = [] 
      groups.forEach(group => {
        if(group.city.includes(city.name)){
          tempGroupArray.push(group);
        }
      });
    setFilteredGroups(tempGroupArray);
    }
  }, [city, selectedIndex])

  const updateIndex =(selectedIndex) => {
    setSelectedIndex(selectedIndex)
  }


const buttons = ['Personer', 'Grupper']

    return (
      <View style={styles.searchContainer}>

          <SearchableDropdown
          setTextFieldInFocus={(value) => setTextFieldInFocus(value)}
          onItemSelect={(item) => {
            setCity(item);
          }}
          containerStyle={{ padding: 5 }}
          itemStyle={{
            padding: 10,
            marginTop: 2,
            backgroundColor: '#ddd',
            borderColor: '#bbb',
            borderWidth: 1,
            borderRadius: 5,
            backgroundColor: '#f6f6f6'
          }}
          itemTextStyle={{ color: '#222' }}
          itemsContainerStyle={{ maxHeight: 166 }}
          items={cityData}
          resetValue={false}
          textInputProps={
            {
              onTextChange: text => setSearchText(text),
              placeholder: "Vælg by",
              underlineColorAndroid: "transparent",
              style: {
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#ccc',
                  borderRadius: 5,
              },
              
            }
          }
          listProps={
            {
              nestedScrollEnabled: true,
            }
          }
      />

   

          {textFieldInFocus ? (
            null
          ) : (
            <View>
            <ButtonGroup
            onPress={updateIndex}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={{height: 30}} 
            
            />

            <View style={styles.foundUsersContainer}>
            <SafeAreaView style={styles.container}>

          {selectedIndex===0? 
            <FlatList
            data={filteredUsers}
            renderItem={({ item }) => 
            <TouchableOpacity onPress={() => props.navigation.navigate('UserDetail', {
              id: item.key,
              name: item.name,
              gender: item.gender,
              dueDate: item.dueDate,
              city: item.city,
              postalCode: item.postalCode,
              birthday: item.birthday,
              photoUrl: item.photoUrl,
            })}>
                <User
                name={item.name}
                dueDate={item.dueDate}
                gender={item.gender}
                city={item.city}
                postalCode={item.postalCode}
                photoUrl={item.photoUrl}
                />
                </TouchableOpacity>
              }
            keyExtractor={item => item.key}
          />
          : null}

          {selectedIndex===1? 
            <FlatList
            data={filteredGroups}
            renderItem={({ item }) => 
            <TouchableOpacity onPress={() => props.navigation.navigate('GroupDetail')}>
                <Group
                key={item.key}
                name={item.name}
                description={item.description}
                gender={item.gender}
                city={item.city}
                postalCode={item.postalCode}
                photoUrl={item.photoUrl}
                />
                </TouchableOpacity>
              }
            keyExtractor={item => item.key}
          />
          : null}
        


          </SafeAreaView>
          
          </View>
          </View>
          )
          }

</View>
    );
  }

const styles = StyleSheet.create({
  button: {
    padding: 10,
  },
  foundUsersContainer: {
    /*
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    */
  },
  buttonContainer: {
    flexDirection:'row',
    justifyContent: 'space-evenly',
    padding: 1,
  },
});

export default Find;
