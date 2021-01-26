import axios from "axios";
import { GET_POSTS, POST_ERROR } from "../../Constants/post.constants";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5000/api/posts/feed");
    console.log(response);

    if (response.data.ClientResp) {
      dispatch({
        type: POST_ERROR,
        payload: response.data.ClientResp,
      });
      console.log("done");
      return response.data.ClientResp;
    } else {
      dispatch({ type: GET_POSTS, payload: response.data });

      return "success";
    }
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
