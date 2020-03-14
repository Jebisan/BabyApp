import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Text, KeyboardAvoidingView, TextInput, Alert, ScrollView, Image, TouchableOpacity } from 'react-native';
import {useDispatch} from 'react-redux';
import {login, logInWithFacebook, fetchUserData} from '../../store/actions/auth';
import { useSelector } from 'react-redux';
import InputTextField from '../../components/InputTextField';


const Login = props => {

  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState()
  const [email, setEmail] = useState('Jebisan1@gmail.com')
  const [password, setPassword] = useState('251008l')
  const userId = useSelector(state => state.auth.userId);
  const _email = useSelector(state => state.auth.email);


  useEffect(() => {
    
    if(userId!==null && authenticated==true){
    async function fetchData() {
      try{
        await dispatch(fetchUserData(userId));
        props.navigation.navigate('MainScreen')
      } catch (error) {
      console.log('Navigating..')
      props.navigation.navigate('CreateAdditionalInformation')
      }
    }
    fetchData();
  }
  }, [userId, authenticated]);
  

  _loginWithFacebook = async() => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(logInWithFacebook());
      setAuthenticated(true);
      setIsLoading(false);

    } catch (err) {
      /*
      console.log('Navigating..')
      props.navigation.navigate('CreateAdditionalInformation')*/
      
        setError(err);
        setIsLoading(false);
    }
  }

  _login = async() => {
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(login(email, password));
      setAuthenticated(true);
    } catch (err) {
      setIsLoading(false);
      if(!authenticated) {
        setError(err.message);
        setIsLoading(false);
      } 
    }
  }

  useEffect(() => {
    if(error){
      Alert.alert('An error occured!', error, [{text: 'Okay!'}])
    }
    
  }, [error])
  

  return (
    <KeyboardAvoidingView behavior='position'>

<View style={styles.parent}>
    <View style={{ marginTop: 60, alignItems: "center", justifyContent: "center"}}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={[styles.text, { marginTop: 10, fontSize: 22, fontWeight: "500" }]}>BabyApp</Text>
    </View>
    <View style={{ marginTop: 48, flexDirection: "row", justifyContent: "center" }}>
       
    <TouchableOpacity onPress={_loginWithFacebook}>
            <View style={styles.socialButton}>
                <Image source={require("../../assets/facebook.png")} style={styles.socialLogo} />
                <Text style={styles.text}>Facebook</Text>
            </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton} onPress={() => Alert.alert('Not supported yet')} >
            <Image source={require("../../assets/google.png")} style={styles.socialLogo} />
            <Text style={styles.text}>Google</Text>
        </TouchableOpacity>
    </View>

    <Text style={[styles.text, { color: "#ABB4BD", fontSize: 15, textAlign: "center", marginVertical: 20 }]}>eller</Text>

    <InputTextField value={email} onChangeText={text => setEmail(text)} style={styles.inputTitle} title="Email" />
    <InputTextField
      value={password}
      onChangeText={text => (setPassword(text))}
        style={{
            marginTop: 32,
            marginBottom: 8
        }}
        title="Password"
        isSecure={true}
    />

    <TouchableOpacity onPress={() => Alert.alert('Not supported yet')} >
      <Text style={[styles.text, styles.link, { textAlign: "right" }]}>Glemt Password?</Text>
    </TouchableOpacity>

    
    {isLoading?<ActivityIndicator size='small' /> : 
    <TouchableOpacity onPress={_login} style={styles.submitContainer}>
    <Text
        style={[
            styles.text,
            {
                color: "#FFF",
                fontWeight: "600",
                fontSize: 16
            }
        ]}
    >
        Login
    </Text>
</TouchableOpacity>}
    

  <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
    <Text
        style={[
            styles.text,
            {
                fontSize: 14,
                color: "#ABB4BD",
                textAlign: "center",
                marginTop: 24
            }
        ]}
    >
        Endnu ikke medlem? <Text style={[styles.text, styles.link]}>Tryk her!</Text>
    </Text>
    </TouchableOpacity>

</View>
</KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  parent: {
    top: 10,
    marginHorizontal: 30
  },
  container: {
      flex: 1,
      backgroundColor: "#fff",
      paddingHorizontal: 30
  },
  text: {
      fontFamily: "Avenir Next",
      color: "#1D2029"
  },
  socialButton: {
      flexDirection: "row",
      marginHorizontal: 12,
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: "rgba(171, 180, 189, 0.65)",
      borderRadius: 4,
      backgroundColor: "#fff",
      shadowColor: "rgba(171, 180, 189, 0.35)",
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 5
  },
  socialLogo: {
      width: 16,
      height: 16,
      marginRight: 8
  },
  link: {
      color: "#FF1654",
      fontSize: 14,
      fontWeight: "500"
  },
  submitContainer: {
      backgroundColor: "#FF1654",
      fontSize: 16,
      borderRadius: 4,
      paddingVertical: 12,
      marginTop: 32,
      alignItems: "center",
      justifyContent: "center",
      color: "#FFF",
      shadowColor: "rgba(255, 22, 84, 0.24)",
      shadowOffset: { width: 0, height: 9 },
      shadowOpacity: 1,
      shadowRadius: 20,
      elevation: 5
  }
});

export default Login;
