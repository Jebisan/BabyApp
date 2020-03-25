import {REMOVE_REQUEST_FROM_GROUP, REQUEST_FOR_MEMBERSHIP, ADD_GROUP, CREATE_GROUP, ADD_USER_TO_GROUP } from '../actions/group'

const INITIAL_STATE = [];

export default groupReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    
        case ADD_GROUP:
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
            /*
            members: action.members,
            requests: action.requests
            */
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
        case REMOVE_REQUEST_FROM_GROUP:
          return state.map(group => {
            if (group.id === action.groupId) {
              return {
                ...group,
                requests: [...group.requests.filter(request => request.key!==action.requestKey)]
              };
            } else {
              return group;
            };
          });
        case REQUEST_FOR_MEMBERSHIP: 
        return state.map(group => {
          if (group.id === action.groupId) {
            return {
              ...group,
              requests: [...group.requests, action.userId]
            };
          } else {
            return group;
          };
        });
     
    default:
      return state;
  }
};
