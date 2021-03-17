import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Keyboard } from "react-native";
import colors from '../constants/colors';
import { MaterialIcons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons'; 

const SearchField = props => {

  const [searchString, setSearchString] = useState('');
  const [inFocus, setInFocus] = useState(false);

  const clear = () => {
      setSearchString('')
  }

  const back = () => {
    console.log('BACK');
    setSearchString('');
    setInFocus(false);
    Keyboard.dismiss();
  }

  useEffect(() => {
      if(inFocus){
          console.log('In focus!')
      } else {
          console.log('Out of focus')
      }
  }, [inFocus])
  

  return (
          <View style={styles.parent}>
            <View style={styles.container}>
              <TouchableOpacity style={inFocus?{display:'flex'}:{display:'none'}}   onPress={() => back()} >
                   <AntDesign name="arrowleft" size={30} color={colors.darkGrey} />
              </TouchableOpacity>
                <View style={styles.textInputContainer} >
                    <TouchableOpacity onPress={() => clear()} >
                        <MaterialIcons style={!inFocus?{display:'flex'}:{display:'none'}} name="search" size={24} color={colors.darkGrey} />
                    </TouchableOpacity>
                          <TextInput
                          onChangeText={text => setSearchString(text)}
                          placeholder={'Søg'}
                          style={styles.textInput}
                          value={searchString}
                          keyboardType={'web-search'}
                          onFocus={() => setInFocus(true)}
                          />
                          <View style={{position: 'absolute', right: 0, paddingRight: 15}} >
                              <MaterialIcons onPress={() => clear()} style={searchString.length>0?{display:'flex'}:{display:'none'}} name="cancel" size={24} color={colors.darkGrey} />
                          </View>
                  </View>
            </View>
          </View>

  );
}

SearchField.navigationOptions = navigationData => {

  return {
    headerTitle: 'Hjem',
  };
};

const styles = StyleSheet.create({
  parent: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      backgroundColor: colors.lightGrey,
      paddingHorizontal: 20

  },
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: 80,
    borderColor: 'red',
    borderWidth: 0,
    borderStyle: 'dashed'

  },
  textInputContainer: {
      height: 45,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderColor: colors.mediumGrey,
      borderStyle: 'solid',
      borderWidth: 1,
      borderRadius: 25,
      paddingLeft: 15,
      paddingRight: 15,
  },
  textInput: {
      fontFamily: 'roboto-regular',
      width: '90%',
      height: '100%',
      fontSize: 15,
      borderColor: 'blue',
      borderStyle: 'solid',
      borderWidth: 0,
  },
});

export default SearchField;
