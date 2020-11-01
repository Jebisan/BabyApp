import React, {useState, useEffect} from 'react'
import {Button, View, StyleSheet, Text, ScrollView ,SafeAreaView, Image, TouchableOpacity, ActivityIndicator} from 'react-native'
import Fire from '../../Fire'
import {useDispatch, useSelector} from 'react-redux'
import {addRequestToGroup, addRequestToUser} from '../../store/actions/group'
import NotificationCenter from '../../NotificationCenter'
import {convertDate} from '../../Shared'


const GroupDetail = props => {
	const dispatch = useDispatch()
	const userId = useSelector(state => state.auth.userId)
	const userName = useSelector(state => state.auth.name)

	const allGroups = useSelector(state => state)
	const myGroups = useSelector(state => state.myGroups)
	const requests = useSelector(state => state.auth.requests)
  

	const groupId = props.navigation.getParam('groupId')
	const name = props.navigation.getParam('name')
	const description = props.navigation.getParam('description')
	const admin = props.navigation.getParam('admin')
	const dueDate = props.navigation.getParam('dueDate')
  
	const [members, setMembers] = useState([])
	const [requesting, setRequesting] = useState(false)
	const [loading, setLoading] = useState(true)
  
	

	useEffect(() => {
		console.log(allGroups)

		if(myGroups.length!==0){
			const existingGroup = myGroups.find(group => group.id==groupId)
  
			if(existingGroup) {

				console.log('Already enrolled in group!')
				props.navigation.goBack()

				props.navigation.navigate('GroupScreen', {
					id: existingGroup.id,
					members: existingGroup.members,
					groupName: existingGroup.name,
					admin: existingGroup.admin,
					description: existingGroup.description
				})


			} else {
				console.log('Not enrolled in Group! ')
				getMembers()
				setLoading(false);
			}
		} else {
			console.log('Empty groups.. ')
			getMembers()

		}
	}, [])

	useEffect(() => {
		if(requests.find(request => request==groupId)){
			setRequesting(true)
		}  
	}, [requests])

	const getMembers = () => {
		setMembers([])    

		Fire.firebase.database().ref('groupMembers/'+groupId).once('value').then(snapshot => {
			const membersArray = Object.keys(snapshot.val()).map(key => {
				return key
			})

			membersArray.forEach(member => {
				Fire.firebase.database().ref('users/'+member).once('value').then((snapshot => {
					const obj = snapshot.val()  
					const user = {
						id: snapshot.key,
						name: obj.name, 
						photoUrl: obj.photoUrl?obj.photoUrl:'http://criticare.isccm.org/assets/images/male_placeholder.png',
						pushToken: obj.pushToken,
						birthday: obj.birthday,
						dueDate: obj.dueDate
					}        
					setMembers(previous => [...previous, user])
				})
				)
			})
		})
	}

     

	const request = () => {
		console.log('REQUESTING..')
		dispatch(addRequestToGroup(userId, groupId))
		dispatch(addRequestToUser(groupId))
		sendNotificationToAdmin()
	}

	const sendNotificationToAdmin = () => {

		Fire.firebase.database().ref('users/'+admin).once('value').then(snapshot => {
			NotificationCenter.sendNotification('Gruppeanmodning', userName + ' har anmodet om medlemskab i din gruppe \''+name+'\'', snapshot.val().pushToken)
		})
	}



	return (
		<View style={styles.parent}>
		{
			loading ? <ActivityIndicator size='large' /> :
			<View>
			<View  style={styles.topContainer} >
			<View>
			<Image source={{ uri: 'http://criticare.isccm.org/assets/images/male_placeholder.png' }} style={styles.groupImage}></Image>  
			</View>
			<View style={styles.column}>
			<Text style={styles.title}>{name}</Text>
			<Text style={styles.subTitle}>{convertDate(dueDate)}</Text>
			<Text style={styles.subTitle}>{description}</Text>
			</View>      
			</View>
			
			<View style={styles.membersContainer}>
			<Text style={styles.membersTitle}>MEDLEMMER </Text>
			<View style={styles.picturesContainer}>
			
			{
				members.map((member) =>
				
				<TouchableOpacity key={member.id} onPress={ () => props.navigation.navigate('UserDetail', {
					
					id: member.id,
					name: member.name,
					gender: member.gender,
					city: member.city,
					postalCode: member.postalCode, 
					birthday: member.birthday,
					photoUrl: member.photoUrl,
					dueDate: member.dueDate,
					pushToken: member.pushToken
					
				})} > 
				<Image source={{ uri: member.photoUrl }} style={styles.profilePicture}></Image>  
				</TouchableOpacity>
				
				)
			}
			</View>
			</View>
			{
				!requesting?   
				<View style={styles.requestButtonContainer} >
				<Button title='Anmod' onPress={request} />
				</View> 
				:
				<View style={styles.requestButtonContainer} >
				<Button disabled title='Anmodning sendt' onPress={request} />
				</View> 
			}
			</View>
		}
			</View>
	)
}

const styles = StyleSheet.create({
	parent: {
		flex: 1,
		paddingTop: 22,
		marginHorizontal: '5%',
	},
	topContainer: {
		flexDirection: 'row',
		fontSize: 18,
		//  borderWidth: 1
	},
	column: {
		flexDirection: 'column'
	},
	groupImage: {
		width: 50, 
		height: 50,  
		backgroundColor: 'lightgrey',
		borderRadius: 8
	},
	title: {
		fontSize: 26,
		marginLeft: 10,
		//  borderWidth: 1,
		width: '100%',
		height: 40
	},
	subTitle: {
		marginLeft: 10,
		color: 'grey',
		// borderWidth: 1,
	},
	membersContainer: {
		// borderWidth: 1,
		top: 20
	},
	membersTitle: {
		textAlign: 'left',
		backgroundColor: '#c6ffd7',
		padding: 10,
		paddingLeft: 20,
		width: 200,
		right: 20,
    
    
	},
	profilePicture: {
		width: 50, 
		height: 50,  
		borderRadius: 50,
		marginLeft: 10,
		borderWidth: 1,
		borderColor: 'lightgrey'
	},
	picturesContainer: {
		flexDirection: 'row',
		padding: 10
	},
	addIcon: {
		padding: 3,
		marginLeft: 10
	}, 
	requestButtonContainer: {
		flexDirection: 'column',
		justifyContent: 'flex-end',
		borderWidth: 1,
		top: 200
	}

})

export default GroupDetail
