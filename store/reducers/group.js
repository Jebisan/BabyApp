import {SET_TEMP_GROUP_DATA} from '../actions/groups'

const INITIAL_STATE = {
  name: null,
  description: null,
  city: null,
  postalCode: null,
  type: null,
};

export default groupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_TEMP_GROUP_DATA:
      return {
        name: action.name,
        description: action.description,
        city: action.city,
        postalCode: action.postalCode,
        type: action.type
      };
   
    default:
      return state
  }
};
