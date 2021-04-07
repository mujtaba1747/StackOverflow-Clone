import { combineReducers } from "redux";
import auth from "./authReducers";
import posts from "./postReducer";
import user from "./userReducers";

export default combineReducers({
  auth,
  posts,
  user,
});
