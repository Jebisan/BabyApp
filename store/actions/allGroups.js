
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

export const setSelectedGroup = (key) => {
	return async (dispatch, getState) => {
			dispatch({type: 'SET_SELECTED_GROUP', key});
	}
}

export const setMembers = (groupId) => {
	return async (dispatch, getState) => {
		const list = []
		// Get group-member keys for specific group
			Fire.firebase.database().ref(`groupMembers/${groupId}`).once('value').then((groupObject => {
	
				let group = Object.keys(groupObject.val()).map(key => {
					return key
		  })
		  group.forEach(member => {
			Fire.firebase.database().ref(`users/${member}`).once('value').then((memberObj => {
			  list.push(memberObj.val());
			  if(list.length === group.length){
				dispatch({type: 'SET_MEMBERS', groupId, members: list});
			  }
			}))
		  });
		}))
}
}