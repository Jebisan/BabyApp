
const INITIAL_STATE = {
  allGroups: [],
};

export default allGroupsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
        case 'FETCH_ALL_GROUPS':
          return { ...state, allGroups: action.groups };

        case 'SET_SELECTED_GROUP':
          // If already selected, deselect
          const found = state.allGroups.find(group => group.key === action.key) 
          if (found.selected === true) {
            const mappedList = state.allGroups.map((group) => {
                return {
                  ...group,
                  selected: false
                };
            });
            return {...state, allGroups: mappedList}
          } else {
          // Else toggle
          let found;
            const newList = state.allGroups.map((group) => {
              if (group.key === action.key) {
                found = group;
                return {
                  ...group,
                  selected: true
                };
              } else {
                return {
                  ...group,
                  selected: false
                };
              };
            }); 
            return {...state, allGroups: newList}
          }
        case 'SET_MEMBERS_DETAILS': 
        const newAllGroups = state.allGroups.map((group) => {
          if (group.key === action.groupId) {
            return {
              ...group,
              membersDetails: action.membersDetails
            };
          } else {
            return {
              ...group,
            };
          }
        })
        return {
          ...state, 
          allGroups: [...newAllGroups], 
        }
        case 'CLEAR_SELECTED_GROUP':
          // Deselect all groups
            const deselectedGroups = state.allGroups.map((group) => {
                return {
                  ...group,
                  selected: false
                };
            });
            return {...state, allGroups: deselectedGroups}
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
