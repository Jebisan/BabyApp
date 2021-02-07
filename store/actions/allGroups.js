
import Fire from '../../Fire'

export const fetchAllGroups = () => {
	return async (dispatch, getState) => {
  
		Fire.firebase.database().ref('groups').once('value').then((groupObject => {

			let groups = Object.keys(groupObject.val()).map(key => {
				const membersObject = groupObject.val()[key].members

				let membersList = Object.keys(membersObject).map(key => {
					return key
				})

				return {key, ...groupObject.val()[key], members: membersList}
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

// DOWNLOAD MEMBER DETAILS WHENEVER NEEDED E.G SelectedGroup
export const setMembers = (groupId) => {
	return async (dispatch, getState) => {
		const list = []
			Fire.firebase.database().ref(`groups/${groupId}/members`).once('value').then((groupObject => {
	
				let group = Object.keys(groupObject.val()).map(key => {
					return key
		  })
		  group.forEach(member => {
			Fire.firebase.database().ref(`users/${member}`).once('value').then((memberObj => {
			  list.push(memberObj.val());
			  if(list.length === group.length){
				dispatch({type: 'SET_MEMBERS_DETAILS', groupId, membersDetails: list});
			  }
			}))
		  });
		}))
}
}