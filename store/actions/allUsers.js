
import Fire from '../../Fire'

export const fetchAllUsers = () => {
	return async (dispatch, getState) => {

		Fire.firebase.database().ref('users').once('value').then((usersObject => {
			const obj = usersObject.val()
			let users = Object.keys(obj).map(key => {

				const childrenObj = obj[key].children;
				let childrenArray = []

				if(childrenObj){
				  childrenArray = Object.keys(childrenObj).map(key => {
					return {id: key, ...childrenObj[key]};
				  });
				}


				return {key, ...obj[key], children: childrenArray}
			})
			dispatch({type: 'FETCH_ALL_USERS', users})
		}))
	}
}