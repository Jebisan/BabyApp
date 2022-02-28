import React, { useRef, useEffect, useState } from 'react';
import {View, StyleSheet, Text, Animated, TextInput, Button } from 'react-native';
import {screenHeight} from '../../constants/sizes';
import { Entypo, FontAwesome, Feather} from '@expo/vector-icons'; 
import colors from '../../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as ImageManipulator from 'expo-image-manipulator';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/actions/myGroups'

// CHECK THIS https://www.npmjs.com/package/expo-image-picker-multiple

const CreatePost = props => {
	const slideFromBottom = useRef(new Animated.Value(screenHeight)).current;
	const backgroundOpacity= useRef(new Animated.Value(0)).current;
	const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

	const [text, setText] = useState('');
	const [type, setType] = useState('post');
	const [photoUri, setPhotoUri] = useState('');


const verifyPermissions = async() => {
	const result = await ImagePicker.requestCameraPermissionsAsync();
	if(result.status !== 'granted'){
		Alert.alert('Insufficient permissions!', 
		'You need to grant camera permissions to use this app.', 
		[{text: 'Okay'}]
		);
		return false;
	};
	return true;
}

const openCameraHandler = async () => {
	const hasPermissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
	if(!hasPermissions){
		return;
	} else {
		const image = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [1,1],
			quality: 1,
		});
	}
}

const openLibraryHandler = async () => {
	const hasPermissions = await verifyPermissions(Permissions.CAMERA_ROLL);
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
			  image.uri,[{ resize: {'height': 200} }],
			  { compress: 1, format: ImageManipulator.SaveFormat.JPEG }
			);
			  setPhotoUri(compressedImage.uri);
		  }
	}
}

	useEffect(() => {
		Animated.spring(
			slideFromBottom,
			{
				toValue: 0,
				tension: 10,
				useNativeDriver: true
			}
		).start();
	}, [slideFromBottom]);


	useEffect(() => {
		Animated.spring(
			backgroundOpacity,
			{
				toValue: 0.7,
				tension: 10,
				useNativeDriver: true
			}
		).start();
	}, [backgroundOpacity]);

	const hideFilter = () => {
		Animated.spring(
			slideFromBottom,
			{
				toValue: screenHeight,
				tension: 10,
				useNativeDriver: true
			}
		).start();

		Animated.spring(
			backgroundOpacity,
			{
				toValue: 0,
				tension: 10,
				useNativeDriver: true
			}
		).start();
		setTimeout(() => {
			props.hideModal();
		}, 500);
	};

	const createPostHandler = () => {
		dispatch(createPost(props.groupId, {
			author: auth.userId,
			createdAt: Date.now(),
			text: text,
			type: type
		}, photoUri
		))
	}
	
	return (
		<View style = {styles.parent}>
			<Animated.View style={{...styles.background, opacity: backgroundOpacity}}></Animated.View>
			<Animated.View style={[styles.modalContainer, {transform: [{translateY: slideFromBottom }]}]}>
				<View style={styles.topContainer}>
					<Entypo name="cross" style={styles.cross} size={24} color="black" onPress={() => hideFilter()} />
					<Text style={styles.title}>Nyt opslag</Text>
				</View>
				<View style={styles.contentContainer}>
					<View style={styles.textAreaContainer} >
						<TextInput
							placeholder='Skriv hvad du gerne vil dele...'
							placeholderTextColor = {colors.mediumGrey}
							style={styles.textArea} 
							value={text}
							onChangeText={text => setText(text)}
							multiline
							numberOfLines={10}
						/>
					</View>
					<View style={styles.buttonsContainer}> 
						<TouchableOpacity onPress={() => openLibraryHandler()} style={styles.iconWrapper} >
							<FontAwesome name="photo" size={40} color={colors.darkGrey} />
							<Text style={styles.iconText}>Billede</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => openCameraHandler()} style={styles.iconWrapper} >
							<Feather name="camera" size={40} color={colors.darkGrey} />
							<Text style={styles.iconText}>Kamera</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={() => console.log('Event')} style={styles.iconWrapper} >
							<Entypo name="calendar" size={40} color={colors.darkGrey} />
							<Text style={styles.iconText}>Begivenhed</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity onPress={() => createPostHandler()} style={styles.shareButton}>
						<Text style={styles.shareButtonText} >Del</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	parent: {
		width: '100%',
		height: '100%',
		position: 'absolute',
		zIndex: 5,
		bottom: 0,
	},
	background: {
		position: 'absolute',
		backgroundColor: 'black',
		width: '100%',
		height: '100%',
		zIndex: 2,
		opacity: 0.4
	},
	modalContainer: {
		position: 'absolute',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: colors.lightGrey,
		borderTopStartRadius: 20,
		borderTopEndRadius: 20,
		width: '100%',
		height: '90%',
		zIndex: 3,
		bottom: 0,
	},
	title: {
		fontFamily: 'roboto-bold',
		fontSize: 16,
	},
	topContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		paddingTop: 30
	},
	cross: {
		position: 'absolute',
		left: 20,
		top: 30
	},
	contentContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		height: '86%',
		width: '100%',
		top: 40,
	},
	textAreaContainer: {
		height: '70%',
		width: '100%',
		shadowRadius: 10,
		shadowOpacity: 0.12,
		shadowOffset: {
			height: 2, 
			width: 0
		},
		backgroundColor: colors.white
	},
	textArea: {
		padding: 30,
		paddingTop: 30,
		height: '100%'
	},
	buttonsContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		backgroundColor: colors.white,
		width: '100%',
		height: 100,
		shadowRadius: 3,
		shadowOpacity: 0.1,
		shadowOffset: {
			height: 1, 
			width: 0
		},
	},
	shareButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 300,
		height: 50,
		backgroundColor: colors.lighterBlue,
		borderRadius: 15,
		marginVertical: 10
	},
	shareButtonText: {
		color: colors.white,
		fontFamily: 'roboto-medium',
		fontSize: 16,
	},
	iconWrapper: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconText: {
		color: colors.darkGrey,
		fontFamily: 'roboto-bold',
		fontSize: 12,
		top: 3
	}
});

export default CreatePost;