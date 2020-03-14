import React, {useState, useEffect} from 'react';
import {View,ActivityIndicator, Picker, ScrollView ,StyleSheet, Text, Button, TextInput, Alert} from 'react-native';
import {useDispatch} from 'react-redux';
import {signUp, createAdditionalData} from '../../store/actions/auth';
import DatePicker from 'react-native-datepicker';
import cityData from '../../cities'


const CreateAdditionalInformation = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [birthday, setBirthday] = useState('')
  const [gender, setGender] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')


  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };



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
  
  const _signUp = async() => {
    
    setError(null);
    setIsLoading(true);

      try {
        await dispatch(createAdditionalData(firstname, lastname,firstname + " " + lastname, birthday, gender, postalCode, city))
        props.navigation.navigate('MainScreen')
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
       
  }

  useEffect(() => {
    if(error){
      Alert.alert('An error occured!', error, [{text: 'Okay!'}])
    }
    
  }, [error])

  return (
    <View style = {styles.parent}>      

<TextInput
textContentType='name'
placeholder='Fornavn'
style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
onChangeText={text => setFirstname(text)}
value={firstname}
/>

<TextInput
textContentType='familyName'
placeholder='Efternavn'
style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
onChangeText={text => setLastname(text)}
value={lastname}
/>


<DatePicker
style={{ width: 200}}
date={birthday} //initial date from state
mode="date" //The enum of date, datetime and time
placeholder="Fødselsdag"
format="DD-MM-YYYY"
minDate="01-01-1900"
maxDate="01-01-2019"
confirmBtnText="Confirm"
cancelBtnText="Cancel"
showIcon={false}
onDateChange={date => setBirthday(date)}
/>

<TextInput
textContentType='postalCode'
placeholder='Postnummer'
style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
onChangeText={text => setPostalCode(text)}
value={postalCode}
/>

<TextInput
editable={false}
textContentType='addressCity'
placeholder='By'
style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
onChangeText={text => setCity(text)}
value={city}
/>

<Picker
  selectedValue={gender}
  style={{height: 50, width: 200, }}
  onValueChange={(itemValue, itemIndex) =>
    setGender(itemValue)
  }>
  <Picker.Item label="Kvinde" value="Kvinde" />
  <Picker.Item label="Mand" value="Mand" />
</Picker>

<View style={styles.buttonContainer}>
{isLoading ? (
  <ActivityIndicator size="small" />
) : (
  <Button onPress={_signUp} title='Registrer!' />
  )}
</View>
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    paddingTop: 100,
    justifyContent: 'flex-start',
    alignItems: 'center',
  } ,
  headerText: {
    fontSize: 50,
    fontWeight: 'bold'
  },
  subTitle: {
    fontSize: 20,

  },
  pickerContainer: {
    borderStyle: 'solid', 
    borderColor: 'black', 
    borderWidth: 1,
  
  }
  ,
  buttonContainer: {
    marginTop: 140,

  }
});

export default CreateAdditionalInformation;
