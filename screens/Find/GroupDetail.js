import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Overlay } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'react-native';
import colors from '../../constants/colors'
import {Entypo, FontAwesome, AntDesign, MaterialCommunityIcons, SimpleLineIcons} from '@expo/vector-icons';
import { convertDate2 } from '../../Shared';
import { Alert } from 'react-native';
import StaticMap from '../../components/StaticMap';
import { TextInput } from 'react-native-gesture-handler';


const GroupDetail = props => {
	const group = props.route.params.group;
	const [visible, setVisible] = useState(false);
	const [requestText, setRequestText] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tincidunt arcu et mollis aliquam. Phasellus faucibus tortor sed eros dignissim congue nec id est. Pellentesque vitae ligula id metus sagittis luctus. ');


	const toggleOverlay = () => {
		setVisible(!visible);
	  };

	useEffect(() => {
		const group2 = props.route.params.group;
		console.log(group2)
	}, [])

	return (
	<View style={styles.parent}>
		<View style={styles.topContainer}>
			<AntDesign onPress={() => props.navigation.goBack()} style={styles.backIcon} name="arrowleft" size={24} color="white" />
			<LinearGradient  colors={[colors.secondaryShade1, colors.secondaryShade2]} style={styles.linearGradient}>
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
					<TouchableOpacity style={styles.requestButton} onPress={toggleOverlay} > 
						<Text style={styles.buttonText}>Anmod</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
		<View style={styles.middleContainer} >
			<View style={styles.descriptionContainer}>
				<Text style={styles.smallTitle}>Om gruppen</Text>
				<Text style={styles.descriptionText}>{group.description}</Text>
			</View>

		</View>
		<View style={styles.bottomContainer} >
		<TouchableOpacity style={styles.membersContainer} onPress={() => Alert.alert('Not sypported yet')} >
		<Text style={styles.smallTitle}>Medlemmer</Text>
		<View style={styles.memberPicturesContainer} >
		{group.members.map((member, index) => (
			<Image key={index} source={{uri: member.photoUrl}} style={styles.memberImage} resizeMode="cover"></Image>
			))}
			<View style={styles.memberImage}>
			<Text style={styles.availableSpotsText}>{group.maxSize-group.members.length}</Text>
			</View>
			<SimpleLineIcons style={{position: 'absolute', left: 310}} name="arrow-right" size={16} color={colors.darkGrey} />
			</View>
			</TouchableOpacity>
			<StaticMap style={styles.mapPreview} location={group.location}></StaticMap>	
		</View>
		<View>
		</View>
		<Overlay overlayStyle={styles.modalContainer} isVisible={visible} onBackdropPress={toggleOverlay}>
			<TouchableOpacity style={styles.cancelButton} onPress={toggleOverlay} >
				<Entypo onPress={toggleOverlay}  name="cross" size={24} color="black" />
			</TouchableOpacity>
			<Text style={styles.modalTitle}>Anmod</Text>
			<Text style={styles.modalSubTitle}>Besked</Text>
			<TextInput
				multiline={true}
				numberOfLines={4}
				onChangeText={text => setRequestText(text)}
				value={requestText}
				style={styles.textInputStyle}
				/>
			<View style={styles.buttonContainer} >
					<TouchableOpacity style={styles.modalRequestButton} onPress={toggleOverlay} > 
						<Text style={styles.buttonText}>Send anmodning</Text>
					</TouchableOpacity>
			</View>
      	</Overlay>
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
		width: '100%',
		height: '100%',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: colors.lightGrey,
		position: 'relative'
	},

	linearGradient: {
		position: 'absolute',
		borderRadius: 25,
		overflow: 'hidden',
		transform: [{rotateZ: "270deg" }],
		left: 70,
		bottom: 70
	},
	header: {
		width: 235,
		height: 375,
	},
	groupFactsContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: 330,
		height: 210,
		backgroundColor: 'white',
		borderRadius: 25,
		shadowRadius: 10,
		shadowOpacity: 0.12,
		shadowOffset: {
			height: 2, 
			width: 0
		},
		top: 80
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
		bottom: 20
	},
	title: {
		fontFamily: 'roboto-regular',
		fontSize: 20,
		bottom: 40
	},
	subTitle: {
		fontFamily: 'roboto-regular',
		fontSize: 13,
		bottom: 36,
		color: colors.darkGrey
	},
	smallText: {
		fontFamily: 'roboto-regular',
		fontSize: 12,
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
		bottom: 10
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
	modalRequestButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		backgroundColor: 'white',
		width: 340,
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
		width: 340,
		minHeight: 50,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
	},
	smallTitle: {
		fontFamily: 'roboto-bold',
		fontSize: 13,
		padding: 7,
	},
	descriptionText: {
		fontFamily: 'roboto-regular',
		fontSize: 12,
		lineHeight: 16,
		paddingLeft: 7,
		paddingRight: 7

	},
	membersContainer: {
		width: 340,
		height: 80,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
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
		paddingLeft: 10,
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
		margin: 3,
	  },
	availableSpotsText: {
		fontFamily: 'roboto-light',
		color: colors.darkGrey,
	},
	verticalContainer: {
		flexDirection: 'column'
	},
	mapPreview: {
		paddingTop: 15,
		width: "100%",
		height: "100%",
	  },
	topContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		position: 'relative',
		width: '100%',
		height: 330
	  },
	middleContainer: {
		position: 'relative',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		width: '100%',
		minHeight: 100,
	},
	bottomContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: "100%",
		minHeight: 100,
		maxHeight: 265,
		paddingTop: 40
	},
	modalContainer: {
		width: "100%", 
		height: "92%",
		bottom: 0,
		position: 'absolute',
		borderRadius: 20,
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingTop: 30
	}, 
	modalTitle: {
		fontFamily: 'roboto-bold',
		fontSize: 18
	},
	cancelButton: {
		position: 'absolute',
		left: 10,
		top: 30,
	},
	textInputStyle: {
		borderWidth: 1,
		width: '95%',
		height: '30%',
		backgroundColor: 'white',
		borderColor: colors.mediumGrey,
		borderRadius: 10,
		shadowRadius: 5,
		shadowOpacity: 0.10,
		shadowOffset: {
			height: 2, 
			width: 2
		},
		bottom: 140,
		paddingLeft: 15,
		paddingTop: 15
	},
	modalSubTitle: {
		position: 'absolute',
		fontFamily: 'roboto-medium',
		left: 20,
		top: 95
	}
})

export default GroupDetail
