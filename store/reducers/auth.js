import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTO_LOGIN, SET_FIREBASE_DATA, SET_PHOTO_URL, SET_PUSH_TOKEN} from '../actions/auth'
import {ADD_REQUEST_TO_USER} from '../actions/myGroups'

const INITIAL_STATE = {
  token: null,
  userId: null,
  didTryAutoLogin: false,
  everythingFetched: false,
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
  requests: [],
  numberOfChildren: 0
};

export default authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        email: action.email,
        didTryAutoLogin: true
      };
      case SET_DID_TRY_AUTO_LOGIN:
        return {
          ...state,
          didTryAutoLogin: true
        }
    case LOGOUT:
      return {
        ...INITIAL_STATE,
        didTryAutoLogin: true
      };

    case SET_FIREBASE_DATA:
      let experience = undefined;
      switch(action.numberOfChildren) {
        case 0:
          experience = 0;
          break;
        case 1:
          experience = 1;
          break;
        default: 
          experience = 2;
        break
      }
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
        requests: action.requests,
        numberOfChildren: action.numberOfChildren,
        experience
      }
      
    case SET_PHOTO_URL:
      return {
        ...state,
        photoUrl: action.photoUrl
      }  
      case 'SET_EVERYTHING_FETCHED':
        return {
          ...state,
          everythingFetched: action.value
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
