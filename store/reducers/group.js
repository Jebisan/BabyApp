import {SET_GROUPS} from '../actions/auth'

const INITIAL_STATE = [];

export default groupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case SET_GROUPS:
        console.log('FROM NEW REDUCER!')
        return [
          ...state, action.group
        ]
      
    default:
      return state
  }
};
