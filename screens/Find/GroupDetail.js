import React, { useEffect } from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import colors from '../../constants/colors'
import {Entypo, FontAwesome, AntDesign, MaterialCommunityIcons, Ionicons} from '@expo/vector-icons';
import { convertDate2 } from '../../Shared';



const GroupDetail = props => {
	const group = props.route.params.group;

	useEffect(() => {
		const group2 = props.route.params.group;
console.log(group2)
	}, [])

	return (
	<View style={styles.parent}>
		<AntDesign onPress={() => props.navigation.goBack()} style={styles.backIcon} name="arrowleft" size={24} color="white" />
		<LinearGradient  colors={['#f6c88b', '#d7893f']} style={styles.linearGradient}>
			<View style={styles.header}></View>
		</LinearGradient>
		<View style={styles.groupFactsContainer}>
			<View style={styles.imageContainer} >
				<Image source={{ uri: group.photoUrl }} style={styles.image} resizeMode="cover"></Image>
			</View>
			<Text style={styles.title}>{group.name}</Text>
			<Text style={styles.subTitle}>{group.groupType === 1 ?'Fædregruppe' : 'Mødregruppe'}</Text>
			<View style={styles.horizontalContainer} >
				<Entypo style={{left: -10, bottom: 1}} name="location-pin" size={16} color={colors.darkGrey} />
				<Text style={{...styles.smallText, left: -9, bottom: 1}}>{group.city}</Text>
				<FontAwesome style={{left: 13, bottom: 1}}  name="calendar-o" size={13} color={colors.darkGrey} />
				<Text style={{...styles.smallText, left: 16, bottom: 1}}>{convertDate2(group.dueDate)}</Text>
			</View>
			<View style={styles.buttonContainer} >
				<View style = {styles.directMessageButtonContainer}>
					<MaterialCommunityIcons name="chat-outline" size={24} color={'black'} />				
				</View>
				<TouchableOpacity style={styles.requestButton}> 
					<Text style={styles.buttonText} >Anmod</Text>
				</TouchableOpacity>
			</View>
		</View>
	</View>
	)
}

export const screenOptions = navigationData => {
	return {
		headerTitle: ''
	}
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	linearGradient: {
		position: 'absolute',
		borderRadius: 25,
		overflow: 'hidden',
		transform: [{rotateZ: "270deg" }],
		bottom: 480
		
	},
	header: {
		width: 230,
		height: 375,
	},
	groupFactsContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: 330,
		height: 230,
		backgroundColor: 'white',
		borderRadius: 25,
		shadowRadius: 10,
		shadowOpacity: 0.12,
		shadowOffset: {
			height: 2, 
			width: 0
		},
		bottom: 150
		},
	imageContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 104,
		height: 104,
		backgroundColor: 'white',
		bottom: 140,
		borderRadius: 20,
		borderColor: 'white',
		shadowRadius: 5,
		shadowOpacity: 0.40,
		shadowOffset: {
			height: 5, 
			width: 5
		},
		zIndex: 1,
		bottom: 55
	},
	image: {
		borderRadius: 20,
		width: 100,
		height: 100,
	},
	horizontalContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		bottom: 13
	},
	title: {
		fontFamily: 'roboto-regular',
		fontSize: 20,
		bottom: 38
	},
	subTitle: {
		fontFamily: 'roboto-regular',
		fontSize: 13,
		bottom: 36,
		color: colors.darkGrey
	},
	smallText: {
		fontFamily: 'roboto-regular',
		fontSize: 14,
		color: colors.darkGrey,
	  }, 
	backIcon: {
		bottom: 200, 
		right: 165, 
		zIndex: 1
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		width: 300,
		height: 50,
		top: 6
	},
	directMessageButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 50,
		height: 40,
		backgroundColor: colors.lightGrey,
		borderRadius: 10,
		shadowRadius: 10,
		shadowOpacity: 0.15,
		shadowOffset: {
			height: 5, 
			width: 0
		},
	},
	requestButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		backgroundColor: 'white',
		width: 200,
		height: 40,
		backgroundColor: colors.primary,
		borderRadius: 6,
		shadowRadius: 8,
		shadowColor: 'black',
		shadowOpacity: 0.16,
		shadowOffset: {
			height: 8, 
			width: 0
		},
	},
	buttonText: {
		color: 'white',
		fontFamily: 'roboto-medium'
	}
})

export default GroupDetail
