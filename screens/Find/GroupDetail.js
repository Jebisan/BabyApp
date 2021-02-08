import React, { useEffect, useState } from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, Alert} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import colors from '../../constants/colors'
import {Entypo, FontAwesome, AntDesign, MaterialCommunityIcons, SimpleLineIcons} from '@expo/vector-icons'
import { convertDate2 } from '../../Shared'
import { useSelector } from 'react-redux'
import MapView, { Marker } from 'react-native-maps'
import RequestModal from '../../components/RequestModal'
import { setRequest } from '../../store/actions/allGroups'

const GroupDetail = props => {
	const [visible, setVisible] = useState(false) // Pass 'visible' to the Modal component, to conditionally render it
	const [requested, setRequested] = useState(false)

	const group = useSelector(state => state.allGroups.allGroups).find(group => group.key === props.route.params.id)
	const userId = useSelector(state => state.auth.userId)

	const toggleModal = () => {
		setVisible(!visible)
	}

	const checkIfRequested = () => {
		if(group.requests.has(userId)){
			setRequested(true)
		}
	}

	useEffect(() => {
		checkIfRequested()
	}, [group.requests])

	useEffect(() => {
		console.log(group)
	}, [group])


	return (
		<View style={styles.parent}>
			{visible &&
		<RequestModal id = {group.key} toggleModal={toggleModal}/>
			}
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
					{ !requested ?
						<TouchableOpacity style={styles.requestButton} onPress={toggleModal} > 
							<Text style={styles.buttonText}>Anmod</Text>
						</TouchableOpacity>
						:
						<TouchableOpacity disabled={true} style={styles.requestedButton}> 
							<AntDesign style={{right: 6, top: 1}} name="check" size={23} color={colors.darkGrey} />
							<Text style={{...styles.buttonText, color: colors.darkGrey}}>Anmodning sendt</Text>
						</TouchableOpacity>
					}
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
						{group.membersDetails.map((member, index) => (
							<Image key={index} source={{uri: member.photoUrl}} style={styles.memberImage} resizeMode="cover"></Image>
						))}
						<View style={styles.memberImage}>
							<Text style={styles.availableSpotsText}>{group.maxSize-group.members.length}</Text>
						</View>
						<SimpleLineIcons style={{position: 'absolute', left: 310}} name="arrow-right" size={16} color={colors.darkGrey} />
					</View>
				</TouchableOpacity>
			
				<MapView style={styles.mapPreview} mapType={'mutedStandard'} region={{...group.location, latitudeDelta: 0.0122, longitudeDelta: 0.0121}} >
					<Marker key={group.key} coordinate={group.location}>
						<View style={styles.group}>
							<FontAwesome name='group' size={14} color={colors.primary} 
							/>
						</View>
					</Marker>
				</MapView>

			</View>
			<View>
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
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: colors.lightGrey,
		position: 'relative',
		height: '100%',
		width: '100%'
	},

	linearGradient: {
		position: 'absolute',
		borderRadius: 25,
		overflow: 'hidden',
		transform: [{rotateZ: '270deg' }],
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
	requestedButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		width: 200,
		height: 40,
		backgroundColor: 'white',
		borderRadius: 6,
		borderColor: colors.mediumGrey,
		borderWidth: 0.4,
		shadowRadius: 8,
		shadowColor: 'black',
		shadowOpacity: 0.12,
		shadowOffset: {
			height: 4, 
			width: 0
		},
	},
	modalRequestButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
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
		marginBottom: 14
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
		width: '100%',
		height: '100%',
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
		width: '100%',
		minHeight: 100,
		maxHeight: 265,
		paddingTop: 40,
	},
	group: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 25, 
		height: 25, 
		borderRadius: 50, 
		backgroundColor: 'white',
		shadowOpacity: 0.4,
		shadowRadius: 2,
		shadowOffset: {width: 0, height: 0}
	},
})

export default GroupDetail
