import axios from "axios";
import { USER_IS_LOADED, AUTH_ERROR } from "../../Constants/auth.constants";
import setAuthenticationToken from "../../Middleware/setAuthenticationToken";

export const userLoaded = () => async (dispatch) => {
  if (localStorage.getItem("token")) {
    setAuthenticationToken(localStorage.getItem("token"));
  }
  try {
    const res = await axios.get(
      "http://localhost:5000/api/users/user/getDetails"
    );
    console.log("res", res);
    dispatch({
      type: USER_IS_LOADED,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
