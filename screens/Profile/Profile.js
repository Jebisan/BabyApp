import React, { useEffect, useState } from 'react'
import { View, StyleSheet, FlatList, Text, ScrollView, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import {Ionicons, MaterialIcons} from '@expo/vector-icons'
import {useSelector} from 'react-redux'
import ImagePicker from '../../components/ImagePicker'
import ProgressCircle from 'react-native-progress-circle'
import moment from 'moment'
import HeaderButton from '../../components/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'

const Profile = props => {

	const [newBirthday, setNewBirthday] = useState([])
	const [newDueDate, setNewDueDate] = useState([])
	const [newToday, setNewToday] = useState([])
	const [weeksToBirth, setWeeksToBirth] = useState(0)
	const [daysToBirth, setDaysToBirth] = useState(0)

	const birthday = useSelector(state => state.auth.birthday)
	const name = useSelector(state => state.auth.name)
	const firstTimer = useSelector(state => state.auth.firstTimer)
	const photoUrl = useSelector(state => state.auth.photoUrl)
	const gender = useSelector(state => state.auth.gender)
	const dueDate = useSelector(state => state.auth.dueDate)
	const city = useSelector(state => state.auth.city)
	const postalCode = useSelector(state => state.auth.postalCode)
	const groups = useSelector(state => state.groups)
	const children = useSelector(state => state.auth.children)


	useEffect(() => {  
		if(dueDate){
			setDueDate()
			setToday()
			setAge()
		}
	}, [])


	const setDueDate = () => {
		var splittedDueDate = dueDate.split('-')
  
		var _newDueDate = []
		_newDueDate.push(parseInt(splittedDueDate[2]),parseInt(splittedDueDate[1]),parseInt(splittedDueDate[0]))
		setNewDueDate(_newDueDate)
	}
  
	const setToday = () => {
		var today = moment().format('YYYY-MM-DD')
		var splittedToday = today.split('-')
    
		var _newToday = []
		_newToday.push(parseInt(splittedToday[0]), parseInt(splittedToday[1]), parseInt(splittedToday[2]))
    
		setNewToday(_newToday)
	}
  
	const setAge = () => {
		var splittedBirthday = birthday.split('-')
  
		var _newBirthday = []
		_newBirthday.push(parseInt(splittedBirthday[2]),parseInt(splittedBirthday[1]),parseInt(splittedBirthday[0]))
    
		setNewBirthday(_newBirthday)
	}
  
	useEffect(() => {
  
		setDaysToBirth(moment(newDueDate).diff(newToday, 'days'))
		setWeeksToBirth(moment(newDueDate).diff(newToday, 'weeks'))
    
	}, [newDueDate, newToday])

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>

				<View style={styles.profilePictureContainer}>
					<View style={styles.profileImage}>
						<ImagePicker/>
					</View>
				</View>

				<View style={styles.infoContainer}>
					<Text style={[styles.text, { fontWeight: '200', fontSize: 20, fontWeight: '400',}]}>{name}</Text>
					<Text style={[styles.text, { color: '#AEB5BC', fontSize: 11, fontWeight: '700', top: 6 }]}>"Lorem ipsum dolor sit amet."</Text>
				</View>

				<View style={styles.horizontalContainer}>

					<View style={styles.statsBox}>

						<View style={styles.infoRow} >

							{gender==='Kvinde'?
								<Ionicons style={styles.infoSymbol} name="md-female" size={24} color="#52575D"></Ionicons>
								:
								<Ionicons style={styles.infoSymbol} name="md-male" size={24} color="#52575D"></Ionicons>
							}
							<Text style={styles.infoText}>  {gender}, {moment(newBirthday).fromNow(true)}</Text>
						</View>

						<View style={styles.infoRow}>
							<MaterialIcons style={styles.infoSymbol} name="child-care" size={24} color="#52575D"></MaterialIcons>
							<Text style={styles.infoText}>{firstTimer?'Yes!':'Nope'}</Text>
						</View>

						<View style={styles.infoRow}>
							<Ionicons style={styles.infoSymbol} name="ios-heart" size={24} color="#f95f62"></Ionicons>
							<Text style={styles.infoText}>@gadvidehvem</Text>
						</View>

						<View style={styles.infoRow}>
							<MaterialIcons style={styles.infoSymbol} name="location-on" size={24} color="#52575D"></MaterialIcons>
							<Text style={styles.infoText}>{postalCode} {city}</Text>
						</View>
					</View>

					{
						dueDate?
							<View style={[styles.statsBox, { borderColor: '#DFD8C8', borderLeftWidth: 1, borderRightWidth: 1 }]}>
								<ProgressCircle
									percent={((40-weeksToBirth)/40)*100}
									radius={55}
									borderWidth={8}
									color="#c6ffd7"
									shadowColor="lightgrey"
									bgColor="#fff"
								>
									<Text style={styles.weekNumber}>{40-weeksToBirth}</Text>
									<Text style={styles.weekText}>uger i dag</Text>
									<Text style={styles.weekSubtext}>{daysToBirth} dage tilbage</Text>
								</ProgressCircle>
							</View>
							:null
					}

					<View style={styles.statsBox}>
						<Text style={styles.interestsTitle}>INTERESSER</Text>
						<Text style={styles.interestsContent}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tellus neque.</Text>
					</View>

				</View>

{ children.length > 0 &&

	<View style={styles.childrenContainer} >
	<Text style={styles.header} >Børn</Text>
	
	<ScrollView contentContainerStyle={styles.childrenList} horizontal={true} >
	
	{
		children.map((item) =>
		<View key={item.id} style={styles.child} >
		<TouchableOpacity onPress={() => props.navigation.navigate('Child', {
			id: item.id,
			firstname: item.firstname,
			lastname: item.lastname,
			birthday: item.birthday,
			gender: item.gender
		})}
		>
		<Child
		firstname = {item.firstname}
		lastname = {item.lastname}
		birthday = {item.birthday}
		gender = {item.gender}
		/>
		</TouchableOpacity>
		</View>
		)
	}
	</ScrollView>
	</View>
}
	
	</ScrollView>
	</SafeAreaView>
	)
}


export const screenOptions = navigationData => {
	return {
		headerTitle: '',
		headerRight: () =>  
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title="drawer"
					iconName= 'md-menu'
					onPress={() => navigationData.navigation.openDrawer()}
				/>
			</HeaderButtons>,
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFF',
      
	},
 
	text: {
		fontFamily: 'HelveticaNeue',
		fontWeight: '200',
		color: '#52575D',
		fontSize: 12,
	},
	titleBar: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		marginTop: 4,
		marginHorizontal: 20,

	},
	subText: {
		fontSize: 12,
		color: '#AEB5BC',
		textTransform: 'uppercase',
		fontWeight: '500'
	},

	genderSymbol: {
		left: 7,
		bottom: 6,

	},
	dm: {
		backgroundColor: '#41444B',
		position: 'absolute',
		top: 20,
		width: 30,
		height: 30,
		borderRadius: 20,
		alignItems: 'center',
		justifyContent: 'center'
	},
	active: {
		backgroundColor: '#34FFB9',
		position: 'absolute',
		bottom: 28,
		left: 10,
		padding: 4,
		height: 20,
		width: 20,
		borderRadius: 10
	},
	add: {
		backgroundColor: '#41444B',
		position: 'absolute',
		bottom: 0,
		right: 0,
		width: 40,
		height: 40,
		borderRadius: 30,
		alignItems: 'center',
		justifyContent: 'center',
      
	},
	infoContainer: {
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: 16,
		bottom: 2
	},
	horizontalContainer: {
		flexDirection: 'row',
		alignSelf: 'center',
		marginTop: 32,
		bottom: 2,
	},
	statsBox: {
		alignItems: 'center',
		flex: 1
	},
	mediaImageContainer: {
		width: 180,
		height: 200,
		borderRadius: 12,
		overflow: 'hidden',
		marginHorizontal: 10
	},
	mediaCount: {
		backgroundColor: '#41444B',
		position: 'absolute',
		top: '50%',
		marginTop: -50,
		marginLeft: 30,
		width: 100,
		height: 100,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
		shadowColor: 'rgba(0, 0, 0, 0.38)',
		shadowOffset: { width: 0, height: 10 },
		shadowRadius: 20,
		shadowOpacity: 1
	},
	recent: {
		marginLeft: 78,
		marginTop: 32,
		marginBottom: 6,
		fontSize: 10
	},
	recentItem: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		marginBottom: 16
	},
	activityIndicator: {
		backgroundColor: '#CABFAB',
		padding: 4,
		height: 12,
		width: 12,
		borderRadius: 6,
		marginTop: 3,
		marginRight: 20
	},
	infoRow: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		padding: 2,
		alignItems: 'center',
		width: 130,
		left: 20,
		//borderWidth: 1
	}, 
	infoSymbol: {
		right: 5,
		top: 1
	},
	infoText: {
		fontFamily: 'HelveticaNeue',
		color: '#52575D',
		fontWeight: '300',
		fontSize: 9,
		left: 4
	},
	weekNumber: {
		fontSize: 28,
		bottom: 9,

		fontFamily: 'HelveticaNeue',
		fontWeight: '300',
		color: '#52575D',
	},
	weekText: {
		fontSize: 14,
		bottom: 11,

		fontFamily: 'HelveticaNeue',
		fontWeight: '200',
		color: '#52575D',
	},
	weekSubtext: {
		fontSize: 8,
		bottom: 5,
		fontFamily: 'HelveticaNeue',
		fontWeight: '200',
		color: '#52575D',
	},
	interestsTitle: {
		fontSize: 11,
		fontFamily: 'HelveticaNeue',
		fontWeight: '300',
		color: '#52575D',
		right: 14
	},
	interestsContent: {
		fontSize: 10,
		top: 10,
		fontFamily: 'HelveticaNeue',
		fontWeight: '200',
		color: '#52575D',
		marginHorizontal: 14
	},
	childrenList: {
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'flex-start',
		width: '100%'
	},
	childrenContainer: {
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		top: 20,
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'lightgrey'
	},
	header: {
		fontSize: 20,
		marginTop: 10,
		fontFamily: 'HelveticaNeue',
		marginBottom: 0,
	}
})

export default Profile
