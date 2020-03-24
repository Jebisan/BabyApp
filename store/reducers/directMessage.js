import {SET_DMS} from '../actions/directMessage'

const INITIAL_STATE = [];

export default directMessageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case SET_DMS:
        return [...action.directMessages];
      
    default:
      return state
  }
};
