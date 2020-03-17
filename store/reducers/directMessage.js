import {SET_DMS} from '../actions/auth'

const INITIAL_STATE = [];

export default directMessageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case SET_DMS:
        return [...state, action.directMessage];
        
      
    default:
      return state
  }
};
