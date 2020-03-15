import React, {useState, useEffect} from 'react';
import {View, Button, Text, StyleSheet, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Fire from '../Fire';
import {useSelector, useDispatch} from 'react-redux';
import {setPhotoUrl} from '../store/actions/auth';
import * as ImageManipulator from 'expo-image-manipulator';


const ImgPicker = props => {


const [pickedImage, setPickedImage] = useState();
const userId = useSelector(state => state.auth.userId);
const photoUrl = useSelector(state => state.auth.photoUrl);
const dispatch = useDispatch();

useEffect(() => {
  if(photoUrl){
    setPickedImage(photoUrl);
  }
}, [photoUrl])



const verifyPermissions = async() => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        if(result.status !== 'granted'){
            Alert.alert('Insufficient permissions!', 
            'You need to grant camera permissions to use this app.', 
            [{text: 'Okay'}]
            );
            return false;
        };
        return true;
    }

const chooseImageHandler = async () => {
    const hasPermissions = await verifyPermissions();
    if(!hasPermissions){
        return;
    } else {
        const image = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [1,1],
            quality: 1,
            
        });
        
        if(image.uri!==undefined){
          const compressedImage = await ImageManipulator.manipulateAsync(
            image.uri,[{ resize: {'height': 200, 'height': 200} }],
            { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
          );
          uploadImage(compressedImage.uri).then(() => {
            setPickedImage(compressedImage.uri);
            })
        }
    }
}

const uploadImage = async(uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();
  var ref = Fire.firebase.storage().ref().child('images/profilePictures/'+userId+'.jpg');
  var uploadTask = ref.put(blob)
  uploadTask.snapshot.ref.getDownloadURL().then(url => {
    dispatch(setPhotoUrl(url))
  })
  return uploadTask;
  
  ;  
}

    return (
        <View style={styles.imagePicker}> 
                    {!pickedImage ? (
                        <TouchableOpacity style={styles.imageContainer} onPress={chooseImageHandler}>
                        <Image
                        source={{uri: 'http://www.madisonnjlibrary.org/wp-content/uploads/2016/06/placeholder-5.png'}}
                      />
                      </TouchableOpacity>

                     ) : (  
                      <TouchableOpacity style={styles.imageContainer} onPress={chooseImageHandler}>
         
                      <View style={styles.profilePictureContainer}>
                      <View style={styles.profileImage}>
                          <Image source={{ uri: pickedImage }} style={styles.image} resizeMode="cover"></Image>
                      </View>
                  </View>
                  </TouchableOpacity>

                        )}
        </View>
    )
}

const styles = StyleSheet.create({
    imagePicker: {
      alignItems: 'center',
    },
    profilePictureContainer: {
      alignSelf: "center" ,
  
  },
    image: {
        flex: 1,
        height: undefined,
        width: undefined
    },  
    profileImage: {
      width: 150,
      height: 150,
      borderRadius: 100,
      overflow: "hidden"
  },
    imagePreview: {
      width: 100,
      height: 100,
      marginBottom: 10,
      justifyContent: 'center',
      alignItems: 'center', 
      borderRadius: 400/ 2
    },

  });

export default ImgPicker;