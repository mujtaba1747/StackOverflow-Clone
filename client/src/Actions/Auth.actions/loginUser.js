import axios from "axios";
import {
  AUTH_FORM_SUCCESS,
  AUTH_FORM_FAIL,
} from "../../Constants/auth.constants";
import { userLoaded } from "../../Actions/Auth.actions/userLoaded";

export const loginUser = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(userData);

    const response = await axios.post(
      "http://localhost:5000/api/user/login",
      body,
      config
    );

    console.log(response);

    if (response.data.ClientResp) {
      dispatch({
        type: AUTH_FORM_FAIL,
        payload: response.data.ClientResp,
      });
      return response.data.ClientResp;
    } else {
      dispatch({
        type: AUTH_FORM_SUCCESS,
        payload: response.data,
      });
      console.log("user logged in");
      dispatch(userLoaded());
      return "success";
    }

    //Error handeling
  } catch (error) {
    dispatch({
      type: AUTH_FORM_FAIL,
      payload: error,
    });
    console.log("error", error);
  }
};
