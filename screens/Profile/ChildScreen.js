import React, { useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Image } from 'react-native'
import { SafeAreaView } from 'react-navigation'
import ImagePicker from '../../components/ImagePicker'
import HeaderButton from '../../components/HeaderButton'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'


const ChildScreen = props => {
	const firstname = props.route.params.firstname
	const lastname = props.route.params.lastname
	const birthday = props.route.params.birthday
	const gender = props.route.params.gender
	const photoUrl = props.route.params.photoUrl ? props.route.params.photoUrl: 'http://criticare.isccm.org/assets/images/male_placeholder.png'

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView showsVerticalScrollIndicator={false}>

				<View style={styles.profilePictureContainer}>
					<View style={styles.profileImage}>
						<Image source={{ uri: photoUrl }} style={styles.image} resizeMode="cover"></Image>
					</View>
				</View>

				<View style={styles.infoContainer}>
					<Text style={[styles.text, { fontWeight: '200', fontSize: 20, fontWeight: '400',}]}>{firstname} {lastname}</Text>
					<Text style={[styles.text, { color: '#AEB5BC', fontSize: 11, fontWeight: '700', top: 6 }]}>{birthday}</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}


export const screenOptions = navigationData => {
	return {
		headerTitle: '',
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
	subText: {
		fontSize: 12,
		color: '#AEB5BC',
		textTransform: 'uppercase',
		fontWeight: '500'
	},
	infoContainer: {
		alignSelf: 'center',
		alignItems: 'center',
		marginTop: 16,
		bottom: 2,
		top: 40
	},
	imageContainer: {
		alignItems: 'center',
		
	},
	  image: {
		width: 100,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},  
	profilePictureContainer: {
		alignSelf: 'center' ,
		top: 40
	}
  
})

export default ChildScreen;
