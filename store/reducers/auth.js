import { AUTHENTICATE, LOGOUT, SET_FIREBASE_DATA, SET_PHOTO_URL, SET_PUSH_TOKEN} from '../actions/auth'
import {ADD_REQUEST_TO_USER} from '../actions/group'

const INITIAL_STATE = {
  token: null,
  userId: null,
  displayName: null,
  firstname: null,
  lastname: null,
  name: null,
  dueDate: null,
  email: null,
  gender: null,
  birthday: null,
  postalCode: null,
  city: null,
  photoUrl: null,
  groups: null,
  pushToken: null,
  requests: null
};

export default authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        email: action.email
      };
    case LOGOUT:
      return INITIAL_STATE;

    case SET_FIREBASE_DATA:
      return {
        ...state,
        firstname: action.firstname,
        lastname: action.lastname,
        name: action.name,
        dueDate: action.dueDate,
        gender: action.gender,
        birthday: action.birthday,
        postalCode: action.postalCode,
        city: action.city,
        photoUrl: action.photoUrl,
        pushToken: action.pushToken,
      }
      
    case SET_PHOTO_URL:
      return {
        ...state,
        photoUrl: action.photoUrl
      }  
      
      case SET_PUSH_TOKEN:
        return {
          ...state,
          pushToken: action.pushToken
        }  

        case ADD_REQUEST_TO_USER: 
            return {
              ...state,
              requests: [...state.requests, action.groupId]
            };
      
    default:
      return state
  }
};
