import {SET_DMS, ADD_DM} from '../actions/directMessage'

const INITIAL_STATE = [];

export default directMessageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case SET_DMS:
        return [...action.directMessages];

        case ADD_DM:
        return [...state, action.dm];
      
    default:
      return state
  }
};
