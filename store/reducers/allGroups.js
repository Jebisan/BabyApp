
const INITIAL_STATE = [];

export default allGroupsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
        case 'FETCH_ALL_GROUPS':
          return action.groups;

        case 'SET_SELECTED_GROUP':
          // If already selected, deselect
          const found = state.find(group => group.key === action.key) 
          if (found.selected === true) {
            return state.map((group) => {
                return {
                  ...group,
                  selected: false
                };
            });
          } else {
          // Else toggle
            return state.map((group) => {
              if (group.key === action.key) {
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
          }
        case 'LOGOUT':
          return INITIAL_STATE;
    default:
      return state;
  }
};
