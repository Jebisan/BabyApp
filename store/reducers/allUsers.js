
const INITIAL_STATE = []

export default allUsersReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case 'FETCH_ALL_USERS':
		console.log(action.users)
		return action.users

	default:
		return state
	}
}
