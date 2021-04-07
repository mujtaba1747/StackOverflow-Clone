import {
  AUTH_FORM_SUCCESS,
  AUTH_FORM_FAIL,
  AUTH_ERROR,
  USER_IS_LOADED,
  LOG_OUT,
  GET_USERS,
} from "../Constants/auth.constants";

//Initital state
const initialState = {
  token: localStorage.getItem("token"),
  users: [],
  user: {},
  errors: {},
  isLoggedIn: false,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_FORM_SUCCESS:
      // console.log(payload);
      localStorage.setItem("token", payload.Token);
      return {
        ...state,
        ...payload,
        isLoggedIn: true,
        errors: {},
      };

    case USER_IS_LOADED:
      localStorage.getItem("token");
      console.log("User is loded", payload);
      return {
        ...state,
        ...payload,
        user: payload,
        errors: {},
        isLoggedIn: true,
      };

    case AUTH_FORM_FAIL:
    case AUTH_ERROR:
    case LOG_OUT:
      localStorage.removeItem("token");
      return {
        ...state,
        ...payload,
        errors: payload,
        user: {},
        isLoggedIn: false,
      };

    // case CHANGE_PROFILE:
    //   return {
    //     ...state,
    //     ...payload,
    //     isLoggedIn: true,
    //     isAllowedToChangePassword: false,
    //     isPasswordChanged: false,
    //     isLoading: false,
    //     errors: null,
    //   };
    // case CHECK_PASSWORDS:
    //   return {
    //     ...state,
    //     ...payload,
    //     isAllowedToChangePassword: true,
    //     errors: {},
    //   };

    case GET_USERS:
      return {
        ...state,
        users: [...payload],
        isLoggedIn: true,
        isAllowedToChangePassword: false,
        isPasswordChanged: false,
        isLoading: false,
        errors: null,
      };

    // case CHANGE_PASSWORD_FAIL:
    // case CHANGE_USER_DATA_FAILED:
    //   return {
    //     ...state,
    //     errors: payload,
    //   };

    default:
      return state;
  }
};

export default auth;
