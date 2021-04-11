
const INITIAL_STATE = {
  allGroups: [],
  allGroupLocations: [],
  selectedGroup: undefined
};

export default allGroupsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {

    case 'FETCH_ALL_GROUP_LOCATIONS': 
    return {...state, allGroupLocations: action.allGroupLocations}
    
        case 'FETCH_ALL_GROUPS':
          return { ...state, allGroups: action.groups };
          case 'SET_SELECTED_GROUP_ICON':
              // If already selected, deselect
              const found = state.allGroupLocations.find(group => group.id === action.id) 
              if (found.selected === true) {
                const mappedList = state.allGroupLocations.map((group) => {
                    return {
                      ...group,
                      selected: false
                    };
                });
                return {...state, allGroupLocations: mappedList}
              } else {
              // Else toggle
              let found;
                const newList = state.allGroupLocations.map((group) => {
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
                return {...state, allGroupLocations: newList}
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
