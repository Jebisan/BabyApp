
const INITIAL_STATE = []

export default allUsersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case 'FETCH_ALL_USERS':
		return action.users
		
		case 'LOGOUT':
			return INITIAL_STATE;
	default:
		return state
	}
}
