const INITIAL_STATE = {
	allGroupLocations: [],
	filteredGroupLocations: [],
	selectedGroup: undefined,
	filter: {
		groupTypes: [
			{ name: 'Mødregruppe', type: 0, selected: false },
			{ name: 'Fædregruppe', type: 1, selected: false },
			{ name: 'Familiegruppe', type: 2, selected: false },
		],
		experiences: [
			{ name: '1. fødsel', type: 0, selected: false },
			{ name: '2. fødsel', type: 1, selected: false },
			{ name: '3+', type: 2, selected: false },
		],
		margin: 4
	}
};

export default allGroupsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {

	case 'SET_ALL_GROUP_LOCATIONS': 
		return {...state, allGroupLocations: action.allGroupLocations}
        
	case 'SET_SELECTED_GROUP_ICON':
		// If already selected, deselect
		const found = state.filteredGroupLocations.find(group => group.id === action.id) 
		if (found.selected === true) {
			const mappedList = state.filteredGroupLocations.map((group) => {
				return {
					...group,
					selected: false
				};
			});
			return {...state, filteredGroupLocations: mappedList}
		} else {
			// Else toggle
			let found;
			const newList = state.filteredGroupLocations.map((group) => {
				if (group.id === action.id) {
					found = group;
					return {
						...group,
						selected: true,
					};
				} else {
					return {
						...group,
						selected: false
					};
				};
			}); 
			return {...state, filteredGroupLocations: newList}
		}
	case 'SET_SELECTED_GROUP':
		// if there is no group selected, select the incoming group
		if(!state.selectedGroup) {
			return {...state, selectedGroup: action.group}
		} else {
			// incoming group is already selected. Deselct it!
			if(state.selectedGroup.id === action.group.id) {
				return {...state, selectedGroup: undefined}
			} else {
				// incoming group is a difference group. Select it!
				return {...state, selectedGroup: action.group}
			}
		}
	
	case 'CLEAR_SELECTED_GROUP':
		// Deselect all groups
		const deselectedGroups = state.filteredGroupLocations.map((group) => {
			return {
				...group,
				selected: false
			};
		});
		return {...state, filteredGroupLocations: deselectedGroups, selectedGroup: undefined}

	
	case 'FILTER_UPDATED': 
		return { ...state, filter: action.filter }
	case 'UPDATE_ALLGROUP_LOCATIONS': 
	const selectedGroupTypes = state.filter.groupTypes.filter(element => element.selected)
	const selectedExperiences = state.filter.experiences.filter(element => element.selected)
	const selectedMargin = state.filter.margin

	const selectedGroups = []
	state.allGroupLocations.forEach(group => {
		selectedGroupTypes.forEach(selectedGroupType => {
			if(selectedGroupType.type === group.groupType) {
				selectedGroups.push(group);
			}
		});
	})

	const selectedGroups2 = []

	selectedGroups.forEach(group => {
		selectedExperiences.forEach(selectedExperience => {
			if(selectedExperience.type === group.experience) {
				selectedGroups2.push(group)
			}
		})
	})

	const selectedGroups3 = []

	selectedGroups2.forEach(group => {
		if (group.margin <= selectedMargin) {
			selectedGroups3.push(group)
		}
	})

	return {...state, filteredGroupLocations: selectedGroups3 }

		//DEPRECATED. NOT USING ALL GROUPS ANYMORE
	case 'SET_REQUEST': 
		const newList = state.allGroups.map((group) => {
			if (group.key === action.groupId) {
				const requestsMap = new Map()
				for (var i in group.requests)
					requestsMap[i] = group.requests[i];

				requestsMap.set(action.userId, action.text)
				return {
					...group,
					requests: requestsMap
				};
			} else {
				return {
					...group,
				};
			}
		})
		return {
			...state, 
			allGroups: [...newList], 
		}

	case 'LOGOUT':
		return INITIAL_STATE;
	default:
		return state;
	}
};
