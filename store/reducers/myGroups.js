import {ADD_GROUP, CREATE_GROUP, ADD_USER_TO_GROUP, ADD_USER_TO_REQUESTS, REMOVE_REQUEST_FROM_GROUP, CLEAR_GROUP_MEMBERS, CLEAR_GROUP_REQUESTS, ADD_POSTS_TO_GROUP} from '../actions/myGroups'

const INITIAL_STATE = []

export default myGroupsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
    
	case ADD_GROUP:
		return [
			...state, action.group,
		]

	case CREATE_GROUP: 
		return [
			...state, {
				id: action.id,
				admin: action.admin,
				name: action.name,
				description: action.description,
				postalCode: action.postalCode,
				city: action.city,
				groupType: action.groupType,
				photoUrl: action.photoUrl,
				members: [],
				memberIds: [],
				requests: [],
				dueDate: action.dueDate
			}
		]
	case ADD_USER_TO_GROUP:
		return state.map(group => {
			if (group.id === action.groupId) {
				return {
					...group,
					members: [...group.members, action.user]
				}
			} else {
				return group
			}
		})

	case ADD_USER_TO_REQUESTS:
		return state.map(group => {
			if (group.id === action.groupId) {
				return {
					...group,
					requests: [...group.requests, action.user]
				}
			} else {
				return group
			}
		})

	case REMOVE_REQUEST_FROM_GROUP:
		return state.map(group => {
			if (group.id === action.groupId) {
				return {
					...group,
					requests: [...group.requests.filter(request => request.personId!==action.personId)]
				}
			} else {
				return group
			}
		})
	case CLEAR_GROUP_REQUESTS:
		return state.map(group => {
			if (group.id === action.groupId) {
				return {
					...group,
					requests: [],
				}
			} else {
				return group
			}
		})

	case CLEAR_GROUP_MEMBERS:
		return state.map(group => {
			if (group.id === action.groupId) {
				return {
					...group,
					members: []
				}
			} else {
				return group
			}
		})

	case ADD_POSTS_TO_GROUP:
		return state.map(group => {
			if (group.id === action.groupId) {
				return {
					...group,
					posts: action.posts
				}
			} else {
				return group
			}
		})


		/*
              
        case REQUEST_FOR_MEMBERSHIP: 
        return state.map(group => {
          if (group.id === action.groupId) {
            return {
              ...group,
              requests: [...group.requests, action.userId]
            };
          } else {
            return group;
          };
        });
        */
	   case 'LOGOUT':
		return INITIAL_STATE;
		
	default:
		return state
	}
}
