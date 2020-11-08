import {SET_DMS, CLEAR_MEMBERS, ADD_MEMBER, ADD_DM} from '../actions/directMessage'

const INITIAL_STATE = []

const directMessageReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case SET_DMS:
		return [...action.directMessages]

	case ADD_MEMBER:
		return state.map(dm => {
			if (dm.chatId === action.chatId) {
				return {
					...dm,
					member: action.member
				}
			} else {
				return dm
			}
		})

	case CLEAR_MEMBERS:
		return []

	case ADD_DM: 
		return [
			...state,
			action.newDm
		]
	case 'LOGOUT':
		return INITIAL_STATE;

	default:
		return state
	}
}

export default directMessageReducer