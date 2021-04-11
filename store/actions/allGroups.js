
import Fire from '../../Fire'

export const fetchAllGroups = () => {
	return async (dispatch, getState) => {
  
		Fire.firebase.database().ref('groups').once('value').then((groupObject => {

			let groups = Object.keys(groupObject.val()).map(key => {
				const membersObject = groupObject.val()[key].members
				const requestsObject = groupObject.val()[key].requests

				let membersList = [];
				let requestsMap = new Map();

				if(membersObject) {
					membersList = Object.keys(membersObject).map(key => {
						return key
					})
				}

				if(requestsObject) {
					requestsMap = new Map(Object.entries(requestsObject))
				}

				return {key, ...groupObject.val()[key], members: membersList, requests: requestsMap, membersDetails: []}
			})
			dispatch({type: 'FETCH_ALL_GROUPS', groups})
		}))
	}
}

export const setSelectedGroup = (key) => {
	return async (dispatch, getState) => {
		console.log('HER', key)
			dispatch({type: 'SET_SELECTED_GROUP', key});
	}
}

export const clearSelectedGroup = () => {
	return async (dispatch, getState) => {
			dispatch({type: 'CLEAR_SELECTED_GROUP'});
	}
}

export const setRequest = (groupId, text) => {
    return async (dispatch, getState) => {

      const userId = getState().auth.userId;
      const token = getState().auth.token;
    
      const response = await fetch(
        `https://babyapp-ed94d.firebaseio.com/groups/${groupId}/requests/${userId}.json?auth=${token}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(text)
        }
      );
  
      if (!response.ok) {
        throw new Error('Could not set request!');
      }


      dispatch({type: 'SET_REQUEST', groupId, userId, text});
    }
  }