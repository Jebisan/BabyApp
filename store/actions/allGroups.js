
import Fire from '../../Fire'

export const fetchAllGroups = () => {
	return async (dispatch, getState) => {
  
		Fire.firebase.database().ref('groups').once('value').then((groupObject => {

			let groups = Object.keys(groupObject.val()).map(key => {
				return {key, ...groupObject.val()[key]}
			})
			dispatch({type: 'FETCH_ALL_GROUPS', groups})
		}))
	}
}