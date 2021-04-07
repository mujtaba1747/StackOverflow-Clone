import { LOG_OUT } from "../../Constants/auth.constants";
export const logOut = () => (dispatch) => {
  console.log("logout");
  dispatch({ type: LOG_OUT });
};
