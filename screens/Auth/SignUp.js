import React, {useState, useEffect} from 'react';
import {View,Image, TouchableOpacity, ScrollView ,StyleSheet, Text, Button, TextInput, Alert, StatusBar, KeyboardAvoidingView, Keyboard, ActivityIndicator} from 'react-native';
import {useDispatch} from 'react-redux';
import {signUp} from '../../store/actions/auth';
import { Ionicons } from "@expo/vector-icons";



const SignUp = props => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState()


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmedPassword, setConfirmedPassword] = useState('')



  const nextPage = async() => {
    setError(null);
    setIsLoading(true);

    if(password===confirmedPassword){
      try {
          // Alert.alert('Not supported at this moment.');
        await dispatch(signUp(email, password))        
        props.navigation.navigate('CreateAdditionalInformation')
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
          } else {
            setError('Passwords does not match! ;/');
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
                  style={{ marginTop: -116, marginLeft: -50 }}
              ></Image>
              <Image
                  source={require("../../assets/authFooter.png")}
                  style={{ position: "absolute", bottom: -325, right: -225 }}
              ></Image>
              <TouchableOpacity style={styles.back} onPress={() => props.navigation.navigate('Login')}>
                  <Ionicons name="ios-arrow-round-back" size={32} color="#FFF"></Ionicons>
              </TouchableOpacity>

              {/*
              <View style={styles.errorMessage}>
                  {error && <Text style={styles.error}>{error}</Text>}
              </View>
              */}
              <View style={styles.formContainer}>
              <View style={styles.form} >
              <View style={{ marginTop: 32 }}>
              <Text style={styles.inputTitle}>Email</Text>
              <TextInput
                keyboardType={'email-address'}
                  style={styles.input}
                  autoCapitalize="none"
                  onChangeText={email => setEmail(email)}
                  value={email}
              ></TextInput>
          </View>

                  <View style={{ marginTop: 32 }}>
                      <Text style={styles.inputTitle}>Adgangskode</Text>
                      <TextInput
                          secureTextEntry
                          style={styles.input}
                          autoCapitalize="none"
                          onChangeText={password => setPassword(password)}
                          value={password}
                      ></TextInput>
                  </View>


                  <View style={{ marginTop: 32 }}>
                      <Text style={styles.inputTitle}>Bekræft Adgangskode</Text>

                      <TextInput
                          style={styles.input}
                          secureTextEntry
                          autoCapitalize="none"    
                          onChangeText={confirmedPassword => setConfirmedPassword(confirmedPassword)}
                          value={confirmedPassword}
                      ></TextInput>

                  </View>
              </View>

              {isLoading?<ActivityIndicator size='large' /> : 

              <TouchableOpacity style={styles.button} onPress={nextPage}>
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
  }

  export const screenOptions = navigationData => {

	return {
    headerShown: false
	}
}


  const styles = StyleSheet.create({
    container: {
        top: 0,
        flex: 1
    },
    greeting: {
        marginTop: 32,
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        color: "#FFF"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    formContainer: {
      bottom: 20
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
        color: "#161F3D"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#E9446A",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
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
        position: "absolute",
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21, 22, 48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        width: 100,
        height: 100,
        backgroundColor: "#E1E2E6",
        borderRadius: 50,
        marginTop: 48,
        justifyContent: "center",
        alignItems: "center"
    }
});

export default SignUp;
