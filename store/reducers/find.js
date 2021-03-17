
const INITIAL_STATE = {
	showMap: true,
	showViewChangerButton: true
}

export default findReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case 'TOGGLE_SHOW_MAP':
			return { ...state, showMap: action.showMap }
		case 'SET_SHOW_VIEW_CHANGER_BUTTON':
			return { ...state, showViewChangerButton: action.value }
		case 'LOGOUT':
			return INITIAL_STATE;
	default:
		return state
	}
}
