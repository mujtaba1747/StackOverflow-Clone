import axios from "axios";
import {
  AUTH_FORM_SUCCESS,
  AUTH_FORM_FAIL,
} from "../../Constants/auth.constants";
import { userLoaded } from "../../Actions/Auth.actions/userLoaded";

export const registerUser = (userData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(userData);

    console.log("call");

    const response = await axios.post(
      "http://localhost:5000/api/user/register",
      body,
      config
    );
    // console.log(response);

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
      console.log("user Register sucess");
      dispatch(userLoaded());
      return "success";
    }

    // dispatch(userLoaded());
  } catch (error) {
    dispatch({
      type: AUTH_FORM_FAIL,
      payload: error,
    });
    console.log("error", error);
  }
};
