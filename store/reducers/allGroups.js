
const INITIAL_STATE = [];

export default allGroupsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
        case 'FETCH_ALL_GROUPS':
          return action.groups;

          case 'LOGOUT':
            return INITIAL_STATE;
    default:
      return state;
  }
};
