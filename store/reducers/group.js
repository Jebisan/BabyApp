import {SET_GROUPS, CREATE_GROUP, ADD_USER_TO_GROUP} from '../actions/auth'

const INITIAL_STATE = [];

export default groupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
      case SET_GROUPS:
        return [
          ...state, action.group
        ];

      case CREATE_GROUP: 
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
            members: action.members,
            requests: action.requests
          }
        ];
        case ADD_USER_TO_GROUP:
          return state.map(group => {
            if (group.id === action.groupId) {
              return {
                ...group,
                members: [...group.members, action.userId]
              };
            } else {
              return group;
            };
          });
     
    default:
      return state;
  }
};
