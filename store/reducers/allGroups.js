
const INITIAL_STATE = [];

export default allGroupsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
        case 'FETCH_ALL_GROUPS':
          return action.groups;

    default:
      return state;
  }
};
