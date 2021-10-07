import React from 'react'
import { StyleSheet, View} from 'react-native'
import MapView from './MapView/MapView'
import ListView from './ListView/ListView'
import colors from '../../constants/colors'
import { useSelector } from 'react-redux'

const Find = (props) => {
	const showMap = useSelector(state => state.find.showMap)

	return (
		<View style= {styles.parentContainer} >
			<View style={styles.back} >
				{showMap ? <MapView navigation= {props.navigation} /> : <ListView navigation= {props.navigation} />} 
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	parentContainer: {
		flex: 1,
	},
	back: {
		width: '100%',
		height: '100%',  
		zIndex: 0
	},
	findTypeButton:{
		top: 645,
		left: 255,
		width: 90,
		height: 40,
		borderRadius: 30,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: colors.primary,
		shadowRadius: 6,
		shadowOpacity: 0.3,
		shadowOffset: { width: 6, height: 6 },
		shadowColor: colors.normalBlue
	},
	buttonTitleStyle: {
		fontSize: 15,
		color: colors.lightGrey,
		fontFamily: 'roboto-medium',
	}
})

export default Find