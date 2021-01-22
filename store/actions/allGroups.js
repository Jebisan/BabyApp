
import Fire from '../../Fire'

export const fetchAllGroups = () => {
	return async (dispatch, getState) => {
  
		Fire.firebase.database().ref('groups').once('value').then((groupObject => {

			let groups = Object.keys(groupObject.val()).map(key => {
				return {key, ...groupObject.val()[key], selected: false}
			})
			dispatch({type: 'FETCH_ALL_GROUPS', groups})
		}))
	}
}

export const setSelectedGroup = (key) => {
	return async (dispatch, getState) => {
			dispatch({type: 'SET_SELECTED_GROUP', key});
	}
}