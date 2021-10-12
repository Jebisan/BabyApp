import React, { useEffect, useState } from 'react';
import {Alert, StyleSheet, Image, View, Text, TouchableOpacity, SafeAreaView ,FlatList, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { AntDesign, Entypo, FontAwesome, MaterialCommunityIcons, MaterialIcons} from '@expo/vector-icons';
import colors from '../../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import {convertDate2, getGroupTypeName} from '../../shared/generic';
import { blueFloatingButton, noResultsText } from '../../shared/styles';
import {fetchUserGroupsPosts} from '../../store/actions/myGroups';
import Post from '../../components/Post';
import Event from '../../components/Event';
import CreatePost from './CreatePost'


const GroupScreen = props => {
	const { navigation } = props;
	const { id } = props.route.params;
	const group = useSelector(state => state.myGroups).find(group => group.id === id);
	const userId = useSelector(state => state.auth.userId);
	const firstName = useSelector(state => state.auth.firstName);
	const photoUrl = useSelector(state => state.auth.photoUrl);
	const dispatch = useDispatch();

	const [showCreatePost, setShowCreatePost] = useState(false)

	// FETCH POSTS
	useEffect(() => {
			if(!group.posts) {
				dispatch(fetchUserGroupsPosts(id));
			}
	}, []);

	return (		
		<View style={{backgroundColor: colors.white}} >
			<TouchableOpacity onPress={() => setShowCreatePost(!showCreatePost)} style={blueFloatingButton}>
				<MaterialCommunityIcons name="pencil" size={24} color={colors.white} />
			</TouchableOpacity>
			{
				showCreatePost && 
				<CreatePost hideModal={() => setShowCreatePost(false)} />
			}
			<FlatList
				contentContainerStyle={styles.bottomContainer}
				ListHeaderComponent= {
					<View style={{flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center'}} >
						<View style={styles.topContainer}>
							<AntDesign onPress={() => navigation.goBack()} style={styles.backIcon} name="arrowleft" size={24} color="white" />
							<LinearGradient colors={[colors.secondaryShade1, colors.secondaryShade2]} style={styles.linearGradient}>
								<View style={styles.header}></View>
							</LinearGradient>
							<View style={styles.groupFactsContainer}>
								<View style={styles.imageContainer} >
									<Image source={{ uri: group.photoUrl }} style={styles.image} resizeMode="cover"></Image>
								</View>
								<Text style={styles.title}>{group.name}</Text>
								<Text style={styles.subTitle}>{getGroupTypeName(group.groupType)}</Text>
								<View style={styles.horizontalContainer} >
									<Entypo style={{left: -10, bottom: 1}} name="location-pin" size={16} color={colors.darkGrey} />
									<Text style={{...styles.smallText, left: -9, bottom: 1}}>{group.city}</Text>
									<FontAwesome style={{left: 13, bottom: 1}}  name="calendar-o" size={13} color={colors.darkGrey} />
									<Text style={{...styles.smallText, left: 16, bottom: 1}}>{convertDate2(group.dueDate)}</Text>
								</View>
								<View style={styles.buttonContainer} >
									<TouchableOpacity style = {styles.directMessageButtonContainer} onPress={() => navigation.navigate('GroupChat', {
										userId: userId,
										firstname: firstName,
										photoUrl: photoUrl,
										groupData: group
									
									})} >
										<MaterialCommunityIcons name="chat-outline" size={24} color={'black'} />                
									</TouchableOpacity>
						
									<TouchableOpacity disabled={true} style={styles.requestedButton}> 
										<Text style={{...styles.buttonText, color: colors.darkGrey}}>Medlem</Text>
									</TouchableOpacity>
								</View>
							</View>
						</View>
						<View style={styles.middleContainer} >
							<View style={styles.descriptionContainer}>
								<Text style={styles.smallTitle}>Om gruppen</Text>
								<Text style={styles.descriptionText}>{group.description}</Text>
							</View>
							<Text style={styles.smallTitle} >Medlemmer</Text>
							<View style={styles.membersContainer}>
								{group.members.map((member) =>
									<TouchableOpacity key={member.id}> 
										<Image source={{ uri: member.photoUrl }} style={{...styles.memberImage, marginHorizontal: -2}}></Image>  
									</TouchableOpacity>
								)}
								<TouchableOpacity style={{...styles.memberImage, marginHorizontal: 10}} onPress={ () => Alert.alert('Not supported at the moment')} >
									<MaterialIcons name="person-add" size={23} color={colors.lightBlue} />
								</TouchableOpacity>
							</View>
						</View>
					</View>
				}
				keyExtractor={item => item.id}
				data={group.posts}
				renderItem={({ item }) => 
					<View> 
					{
					item.type === 'post' && <Post
					text = {item.text}
					name = {item.name}
					userPhotoUrl = {item.userPhotoUrl}
					photoUrl = {item.photoUrl}
					createdAt = {item.createdAt}
					/>
					}
					{
						item.type === 'event' && <Event
						text = {item.text}
						name = {item.name}
						userPhotoUrl = {item.userPhotoUrl}
						createdAt = {item.createdAt}
						startTime = {item.event.startTime}
						title = {item.event.title}
						endTime = {item.event.endTime}
						address = {item.event.location.address}
						postalCode = {item.event.location.postalCode}
						city = {item.event.location.city}
						latitude = {item.event.location.latitude}
						longitude = {item.event.location.longitude}
						/>
						}
					</View>
				
				}
			/>
		</View>
	);  
};

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: colors.lightGrey,
		position: 'relative',
	},
	linearGradient: {
		position: 'absolute',
		borderRadius: 25,
		overflow: 'hidden',
		transform: [{rotateZ: '270deg' }],
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
		top: 80,
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
	smallTitle: {
		fontFamily: 'roboto-bold',
		fontSize: 13,
		padding: 7,
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
		marginVertical: 10
	},
	descriptionText: {
		fontFamily: 'roboto-regular',
		fontSize: 12,
		lineHeight: 16,
		paddingLeft: 7,
		paddingRight: 7

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
		alignItems: 'flex-start',
		marginBottom: 10
	},
	
	bottomContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	membersContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		shadowOpacity: 0.15,
		shadowRadius: 4,
		shadowOffset: {
			width: 0, 
			height: 2
		},
		marginHorizontal: 10,
	},
	memberImage: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 48,
		height: 48,
		borderRadius: 50,
		borderWidth: 0.3,
		borderColor: colors.mediumGrey,
		marginTop: 3,
		backgroundColor: colors.white,
	},
});

export default GroupScreen;
