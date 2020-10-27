
import Fire from '../../Fire'

export const fetchAllUsers = () => {
	return async (dispatch, getState) => {

		Fire.firebase.database().ref('users').once('value').then((usersObject => {
			const obj = usersObject.val()
			let users = Object.keys(obj).map(key => {
				return {key, ...obj[key]}
			})
			dispatch({type: 'FETCH_ALL_USERS', users})
		}))
	}
}