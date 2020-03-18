import React, {useState, useEffect} from 'react';
import {View,Image, TouchableOpacity, ScrollView, Picker ,StyleSheet, Text, Button, TextInput, Alert, StatusBar, KeyboardAvoidingView, Keyboard, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {signUp, createAdditionalData} from '../../store/actions/auth';
import DatePicker from 'react-native-datepicker';
import cityData from '../../cities';
import { Ionicons } from "@expo/vector-icons";;



const CreateAdditionalInformation = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState()

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [birthday, setBirthday] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [gender, setGender] = useState('Kvinde')
  const [postalCode, setPostalCode] = useState('')
  const [city, setCity] = useState('')


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
        await dispatch(createAdditionalData(firstname, lastname,firstname + " " + lastname, birthday, gender, postalCode, city, dueDate))
        props.navigation.navigate('MainScreen')
        setIsLoading(false);
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
    <KeyboardAvoidingView style={styles.container} behavior='position' >
    <StatusBar barStyle="light-content"></StatusBar>
    <Image
        source={require("../../assets/authHeader.png")}
        style={{ marginTop: -90, marginLeft: -50 }}
    ></Image>
    <Image
        source={require("../../assets/authFooter.png")}
        style={{ position: "absolute", bottom: -325, right: -225 }}
    ></Image>
    <TouchableOpacity style={styles.back} onPress={() => props.navigation.navigate('Login')}>
        <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>
    </TouchableOpacity>
  
    <View style={styles.formContainer}>
  

    <View style={styles.row}>
    
    <View style={{ marginTop: 32 }}>
    <Text style={styles.inputTitle}>Fornavn</Text>
    <TextInput
    style={styles.input}
    autoCapitalize="none"
    onChangeText={text => setFirstname(text)}
    value={firstname}
    ></TextInput>
    </View>
    
    
    <View style={{ marginTop: 32 }}>
    <Text style={styles.inputTitle}>Efternavn</Text>
    <TextInput
    style={styles.input}
    autoCapitalize="none"
    onChangeText={text => setLastname(text)}
    value={lastname}
    ></TextInput>
    </View>
    
    </View>
        <View style={styles.row}>        
        
        <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>Postnummer</Text>
            <TextInput
                keyboardType={'number-pad'}
                style={styles.input}
                autoCapitalize="none"    
                onChangeText={ text=> setPostalCode(text)}
                value={postalCode}
            ></TextInput>
        </View>


        <View style={{ marginTop: 32 }}>
            <Text style={styles.inputTitle}>By</Text>
            <TextInput
                style={styles.input}
                autoCapitalize="none"
                editable={false}
                value={city}
            ></TextInput>
        </View>

        </View>

        <View style={styles.row}>
        
        <View style={{ marginTop: 32 }}>
        <Text style={styles.inputTitle}>Fødselsdag</Text>
        <DatePicker
        style={{ width: 100}}
        date={birthday} //initial date from state
        mode="date" //The enum of date, datetime and time
        placeholder=""
        format="DD-MM-YYYY"
        minDate="01-01-1900"
        maxDate="01-01-2021"
        confirmBtnText="Bekræft"
        cancelBtnText="Luk"
        showIcon={false}
        onDateChange={date => setBirthday(date)}
        customStyles={{dateInput:styles.dateInput, dateText:styles.dateText}}
        />
        </View>
        
        <View style={{ marginTop: 32 }}>
        <Text style={styles.inputTitle}>Terminsdato</Text>
        <DatePicker
        style={{ width: 100}}
        date={dueDate} //initial date from state
        mode="date" //The enum of date, datetime and time
        placeholder=""
        format="DD-MM-YYYY"
        minDate="01-01-1900"
        maxDate="01-01-2021"
        confirmBtnText="Bekræft"
        cancelBtnText="Luk"
        showIcon={false}
        onDateChange={date => setDueDate(date)}
        customStyles={{dateInput:styles.dateInput, dateText:styles.dateText}}
        />
        </View>
</View>

<View style={styles.row}>

<View style={styles.pickerContainer}>
  <Text style={styles.inputTitle}>Køn</Text>
  <Picker
  style={styles.onePicker} itemStyle={styles.onePickerItem}
  selectedValue={gender}
  onValueChange={text => setGender(text)}
  >
  <Picker.Item label="Kvinde" value="Kvinde" />
  <Picker.Item label="Mand" value="Mand" />
  </Picker>
</View>

</View>



    </View>
    <View style={styles.buttonContainer}>

    {isLoading?<ActivityIndicator size='large' /> : 
    
    <TouchableOpacity style={styles.button} onPress={_signUp}>
    <Text style={{ color: "#FFF", fontWeight: "500" }}>Registrer!</Text>
    </TouchableOpacity>
  } 
    
    <TouchableOpacity
    style={{ alignSelf: "center", marginTop: 32 }}
    onPress={() => props.navigation.navigate("Login")}
>
    <Text style={{ color: "#414959", fontSize: 13 }}>
        Er du allerede medlem? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Log in</Text>
    </Text>
</TouchableOpacity>
</View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
      bottom: 150,
      flex: 1
  },
  greeting: {
      marginTop: 32,
      fontSize: 18,
      fontWeight: "500",
      textAlign: "center",
      color: "#FFF"
  },

  formContainer: {
      marginBottom: 48,
      marginHorizontal: 30,
      bottom: 30
  },
  inputTitle: {
      color: "#8A8F9E",
      fontSize: 10,
      textTransform: "uppercase"
  },
  input: {
      borderBottomColor: "#8A8F9E",
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 40,
      fontSize: 15,
      color: "#161F3D",
      width: 100
  },
  button: {
      marginHorizontal: 30,
      backgroundColor: "#E9446A",
      borderRadius: 4,
      height: 52,
      alignItems: "center",
      justifyContent: "center",
  },
  errorMessage: {
      height: 72,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 30
  },
  error: {
      color: "#E9446A",
      fontSize: 13,
      fontWeight: "600",
      textAlign: "center"
  },
  back: {
      position: 'relative',
      bottom: 80,
      left: 20,
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "rgba(21, 22, 48, 0.1)",
      alignItems: "center",
      justifyContent: "center",
  },
  row: {
    flexDirection:'row',
    justifyContent: 'space-around',
},
buttonContainer: {
  //borderWidth: 1,
  bottom: 20
},
pickerContainer: {
  marginTop: 32,
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems:'center'
}, 
onePicker: {
  width: 100,
  height: 44,
 
},
onePickerItem: {
  height: 88,
  color: '#161F3D'
},
dateInput: {
  borderTopColor: 'white',
  borderLeftColor: 'white',
  borderRightColor: 'white',
  borderBottomColor: "#8A8F9E",
  borderBottomWidth: StyleSheet.hairlineWidth,
  height: 40,
  fontSize: 15,
  color: "#161F3D",
  width: 100
},
dateText:{
  fontSize: 15,
  color: "#161F3D",
  width: 100
}

});


export default CreateAdditionalInformation;
