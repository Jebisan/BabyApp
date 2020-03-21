import {SET_GROUPS, CREATE_GROUP, ADD_GROUP_TO_USER} from '../actions/auth'

const INITIAL_STATE = [];

export default groupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
      case SET_GROUPS:
        return [
          ...state, action.group
        ];

      case CREATE_GROUP: 
      console.log(action)
        return [
          ...state, {
            id: action.id,
            admin: action.admin,
            name: action.name,
            description: action.description,
            postalCode: action.postalCode,
            city: action.city,
            groupType: action.groupType,
            photoUrl: action.photoUrl,
            members: action.members
          }
        ];
     
    default:
      return state;
  }
};
