import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, TextInput, View, Text, TouchableOpacity, Alert } from 'react-native';
import HeaderButton from '../../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';

const Settings = props => {
	const _firstname = useSelector(state => state.auth.firstname)
	const _lastname = useSelector(state => state.auth.lastname)
  const _gender = useSelector(state => state.auth.gender)
  const _city = useSelector(state => state.auth.city)
  const _postalCode = useSelector(state => state.auth.postalCode)
  const _birthday = useSelector(state => state.auth.birthday)
  
  const [editingMode, setEditingMode] = useState(false);

  const [firstname, setFirstname] = useState(_firstname);
  const [lastname, setLastname] = useState(_lastname);
  const [gender, setGender] = useState(_gender);
  const [city, setCity] = useState(_city);
  const [postalCode, setPostalCode] = useState(_postalCode);
  const [birthday, setBirthday] = useState(_birthday);

  return (
    <View style = {styles.parent}>
    <View style={styles.row} >
    <Text style= {styles.headerText}>Dine oplysninger</Text>
    {
      editingMode?
  null
      :
      <TouchableOpacity style={styles.editingButton}  onPress={() => setEditingMode(true)} >
        <AntDesign 
        name='edit' 
        size={30} 
        color='black' 
        />
      </TouchableOpacity>
    }
    </View>
      <View style= {styles.container} >

      <View style= {styles.row} >
        <Text style= {styles.labelText}>Fornavn:</Text>
        <TextInput
        editable={editingMode}
        style={ editingMode? styles.editingInputField : styles.inputField}
        onChangeText={text => setFirstname(text)}
        value={firstname}
      />
      </View>

      <View style= {styles.row} >
      <Text style= {styles.labelText}>Efternavn:</Text>
      <TextInput
      editable={editingMode}
      style={ editingMode? styles.editingInputField : styles.inputField}
      onChangeText={text => setLastname(text)}
      value={lastname}
    />
    </View>

    <View style= {styles.row} >
    <Text style= {styles.labelText}>Køn:</Text>
    <TextInput
    editable={editingMode}
    style={ editingMode? styles.editingInputField : styles.inputField}
    onChangeText={text => setGender(text)}
    value={gender}
  />
  </View>

  
  <View style= {styles.row} >
  <Text style= {styles.labelText}>Postnummer:</Text>
  <TextInput
  editable={editingMode}
  style={ editingMode? styles.editingInputField : styles.inputField}
  onChangeText={text => setPostalCode(text)}
  value={postalCode}
  />
  </View>
  
  <View style= {styles.row} >
  <Text style= {styles.labelText}>By:</Text>
  <TextInput
  editable={false}
  style={styles.inputField}
  onChangeText={text => setCity(text)}
  value={city}
  />
  </View>
  
<View style= {styles.row} >
<Text style= {styles.labelText}>Fødselsdato:</Text>
<TextInput
editable={editingMode}
style={ editingMode? styles.editingInputField : styles.inputField}
onChangeText={text => setBirthday(text)}
value={birthday}
/>
</View>

{ !!editingMode &&
  <View style={styles.saveButton}> 
  <Button  color='black' title = 'Gem' onPress ={() => setEditingMode(false)}  />
  </View>
}
  </View>
  </View>

  );
};

export const screenOptions = navigationData => {
	return {
		headerTitle: 'Indstillinger',
		headerRight: () =>  
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="drawer"
					iconName= 'md-menu'
					onPress={() => navigationData.navigation.openDrawer()}
				/>
			</HeaderButtons>,
	}
}


const styles = StyleSheet.create({
  parent: {
    paddingTop: 50,
    justifyContent: 'flex-start',
    alignItems: 'center',
  } ,
  headerText: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 20,
  }, 
  labelText: {
    fontSize: 14,
    textAlign: 'right'
  }, 
  inputField : {
    fontSize: 14,
    height: 20, 
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
    width: 120,
    fontStyle: 'italic'
  },
  editingInputField : {
    fontSize: 14,
    height: 20, 
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 5,
    marginRight: 5,
    width: 120,
    borderWidth: 1, 
    borderColor:'lightgrey',
  },
  container: {
    width: '65%',
    height: '100%',
    top: 30,
    right: 50
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    margin: 10
  },
  editingButton:{
    left: 10
  }, 
  saveButton: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 50,
    top: 50,
  }
})

export default Settings;