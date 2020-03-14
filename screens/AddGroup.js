import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, TextInput, Button } from 'react-native';
import cityData from '../cities';
import {ButtonGroup} from 'react-native-elements';
import {useDispatch} from 'react-redux';


const AddGroup = props => {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')
  const dispatch = useDispatch();

  togglePredictHandler = () => {
     dispatch(setTempGroupData(name, description, postalCode, city, selectedIndex))
    props.navigation.navigate('FindUsers');
  }

  useEffect(() => {
    props.navigation.setParams({togglePred: togglePredictHandler,});
  }, []);

  useEffect(() => {
    if(postalCode.length===4){
      cityData.forEach(city => {
        if(city.id===postalCode){
          setCity(city.name)
        } else if (postalCode===''){
          setCity('')
        }
      });
    } else {
      setCity('');
    }
  }, [postalCode])

  const updateIndex =(selectedIndex) => {
    setSelectedIndex(selectedIndex)
  }

  const buttons = ['Mødregruppe', 'Fædregruppe']


  return (
    <View style = {styles.parent}>

    <View style = {styles.information}>
    

      <TextInput
      style={styles.textInput}
      onChangeText={text => setName(text)}
      value={name}
      placeholder='Navn'
    />

    <TextInput
    style={styles.textInput}
    onChangeText={text => setDescription(text)}
    value={description}
    placeholder='Beskrivelse'
  />

  <TextInput
textContentType='postalCode'
placeholder='Postnummer'
style={styles.textInput}
onChangeText={text => setPostalCode(text)}
value={postalCode}
/>

<TextInput
editable={false}
textContentType='addressCity'
placeholder='By'
style={styles.textInput}
onChangeText={text => setCity(text)}
value={city}
/>


</View>

<View style= {styles.buttonGroupContainer} >
<ButtonGroup
onPress={updateIndex}
selectedIndex={selectedIndex}
buttons={buttons}
containerStyle={{height: 30}} 
/>
</View>
<View>

<View style={styles.searchBar}>
</View>
</View>
    </View>
  );
};

AddGroup.navigationOptions = navigationData => {
  const togglePredict = navigationData.navigation.getParam('togglePred');

  return {
    headerTitle: 'Ny gruppe',
    headerRight: <Button title='Næste' onPress={togglePredict} />
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

  information: {
  },
  buttonGroupContainer: {
    top: 20,
    width: 300,
  },

});

export default AddGroup;
