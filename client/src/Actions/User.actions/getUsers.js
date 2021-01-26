import { GET_USERS, USER_ERROR } from "../../Constants/user.constants";
import axios from "axios";

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/users`);
    console.log("Get all users", res.data);
    dispatch({ type: GET_USERS, payload: res.data });
  } catch (error) {
    dispatch({
      type: USER_ERROR,
      payload: error,
    });
  }
};
