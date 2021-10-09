import colors from '../constants/colors'
import { screenHeight, screenWidth } from '../constants/sizes'

export const blueFloatingButton = {
		position: 'absolute',
		justifyContent: 'center',
		alignItems :'center',
		height: 60,
		width: 60,
		backgroundColor: colors.lightBlue,
		margin: 20,
		borderRadius: 40,
		shadowRadius: 8,
		shadowOpacity: 0.20,
		shadowColor: 'black',
		zIndex: 2,
		top: screenHeight-180,
		left: screenWidth-100
	}

	export const noResultsText = {
		fontFamily: 'roboto-regular',
		fontSize: 18,
		color: colors.darkGrey,
	}