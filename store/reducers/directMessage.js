import {SET_DMS, CLEAR_MEMBERS, ADD_MEMBER} from '../actions/directMessage'

const INITIAL_STATE = [];

export default directMessageReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case SET_DMS:
        return [...action.directMessages];

      
        case ADD_MEMBER:
          return state.map(dm => {
            if (dm.chatId === action.chatId) {
              return {
                ...dm,
                member: action.member
              };
            } else {
              return dm;
            };
          });

        case CLEAR_MEMBERS:
          return []

    default:
      return state
  }
};
