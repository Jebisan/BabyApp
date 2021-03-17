export const toggleShowMap = () => {
	return async (dispatch, getState) => {
		const showMap = getState().find.showMap;
		
			dispatch({type: 'TOGGLE_SHOW_MAP', showMap: !showMap})
	}
}

export const setShowViewChangerButton = (value) => {
	return async (dispatch, getState) => {
			dispatch({type: 'SET_SHOW_VIEW_CHANGER_BUTTON', value})
	}
}