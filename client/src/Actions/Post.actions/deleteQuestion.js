import { REMOVE_POST, POST_ERROR } from "../../Constants/post.constants";
import axios from "axios";
import { getPosts } from "../Post.actions/getPosts";
import { getUsersPosts } from "../Post.actions/getUsersPosts";

export const deleteQuestion = (Qid, Username) => async (dispatch) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/posts/question/${Qid}/delete`
    );
    if (response.data.ClientResp) {
      dispatch({
        type: POST_ERROR,
        payload: response.data.ClientResp,
      });
      return response.data.ClientResp;
    } else {
      dispatch({ type: REMOVE_POST, payload: response.data });
      dispatch(getPosts());
      dispatch(getUsersPosts(Username));
      console.log("deleted successfully");
      return "success";
    }
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
