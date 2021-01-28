import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import colors from '../../constants/colors'
import {Entypo, FontAwesome, AntDesign, MaterialCommunityIcons, SimpleLineIcons} from '@expo/vector-icons';
import { convertDate2 } from '../../Shared';
import { Alert } from 'react-native';
import StaticMap from '../../components/StaticMap'




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
				<TouchableOpacity style = {styles.directMessageButtonContainer} onPress={() => Alert.alert('Not supported yet')} >
					<MaterialCommunityIcons name="chat-outline" size={24} color={'black'} />				
				</TouchableOpacity>
				<TouchableOpacity style={styles.requestButton} onPress={() => Alert.alert('Not supported yet')} > 
					<Text style={styles.buttonText} >Anmod</Text>
				</TouchableOpacity>
			</View>
		</View>
		<View style={styles.descriptionContainer}>
			<Text style={styles.smallTitle}>Om gruppen</Text>
			<Text style={styles.descriptionText}>{group.description}</Text>
		</View>
			<TouchableOpacity style={styles.membersContainer} onPress={() => Alert.alert('Not sypported yet')} >
				<Text style={styles.smallTitle}>Medlemmer</Text>
				<View style={styles.memberPicturesContainer} >
					{group.members.map((member, index) => (
						<Image key={index} source={{uri: member.photoUrl}} style={styles.memberImage} resizeMode="cover"></Image>
						))}
					<View style={styles.memberImage}>
						<Text style={styles.availableSpotsText}>{group.maxSize-group.members.length}</Text>
					</View>
					<SimpleLineIcons style={{left: 90}} name="arrow-right" size={16} color={colors.darkGrey} />
				</View>
			</TouchableOpacity>
		<StaticMap style={styles.mapPreview} location={group.location}></StaticMap>	
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
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.lightGrey,
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
		bottom: 50
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
		top: 50, 
		right: 160, 
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
	},
	descriptionContainer: {
		width: 325,
		minHeight: 50,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		bottom: 150
	},
	smallTitle: {
		fontFamily: 'roboto-bold',
		fontSize: 13
	},
	descriptionText: {
		fontFamily: 'roboto-regular',
		top: 12,
		fontSize: 12
	},
	membersContainer: {
		width: 325,
		minHeight: 50,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		bottom: 210,
	},
	memberPicturesContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: 340,
		height: 50,
		backgroundColor: 'white',
		borderRadius: 10,
		shadowRadius: 5,
		shadowOpacity: 0.07,
		shadowOffset: {
			height: 2, 
			width: 2
		},
		top: 10,
		right: 8,
		paddingLeft: 10
	},
	memberImage: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		width: 35,
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 50,
		borderWidth: 1,
		borderColor: colors.mediumGrey,
		margin: 3
	  },
	availableSpotsText: {
		fontFamily: 'roboto-light',
		color: colors.darkGrey,
	},
	verticalContainer: {
		flexDirection: 'column'
	},
	mapPreview: {
		width: '100%',
		height: 180,
		bottom: 0,
		position: 'absolute'
	  }
})

export default GroupDetail
