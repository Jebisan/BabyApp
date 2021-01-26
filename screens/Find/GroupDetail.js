import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';


const GroupDetail = props => {

	return (
	<View style={styles.parent}>
			<LinearGradient  colors={['#f6c88b', '#d7893f']} style={styles.linearGradient}>
				<View style={styles.header}></View>
			</LinearGradient>
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
		justifyContent: 'center',
		alignItems: 'center',
	},
	header: {
		width: 250,
		height: 375,
	},
	linearGradient: {
		borderRadius: 25,
		overflow: 'hidden',
		transform: [{rotateZ: "270deg" }],
		bottom: 300
		
	}
})

export default GroupDetail
