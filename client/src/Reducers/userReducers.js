import {
  GET_USER_BY_ID,
  USER_ERROR,
  GET_USER_POSTS,
  GET_POST_BY_USER_ID,
} from "../Constants/user.constants";

const initialState = {
  userProfile: null,
  profilePosts: null,
  errors: {},
};

const users = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_USER_BY_ID:
      return {
        ...state,
        userProfile: payload,
      };
    case GET_USER_POSTS:
    case GET_POST_BY_USER_ID:
      return {
        ...state,
        profilePosts: payload,
      };
    case USER_ERROR:
      return {
        ...state,
        userProfile: null,
        profilePosts: null,
        errors: payload,
      };
    default:
      return state;
  }
};

export default users;
