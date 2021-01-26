import { MAKE_POST, POST_ERROR } from "../../Constants/post.constants";
import axios from "axios";

export const createPost = (Qbody) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ Qbody });
    const response = await axios.post(
      `http://localhost:5000/api/posts/question/add`,
      body,
      config
    );

    console.log(response);

    if (response.data.ClientResp) {
      dispatch({
        type: POST_ERROR,
        payload: response.data.ClientResp,
      });
      return response.data.ClientResp;
    } else {
      dispatch({
        type: MAKE_POST,
        payload: response.data,
      });

      return "success";
    }
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
