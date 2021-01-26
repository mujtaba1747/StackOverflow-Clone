import { ADD_COMMENT, POST_ERROR } from "../../Constants/post.constants";
import axios from "axios";
import { getPosts } from "../Post.actions/getPosts";

export const addAnswerToQuestion = (Abody, Qid) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify({ Abody: Abody, Qid: Qid });
    const response = await axios.post(
      `http://localhost:5000/api/posts/answer/add`,
      body,
      config
    );
    if (response.data.ClientResp) {
      dispatch({
        type: POST_ERROR,
        payload: response.data.ClientResp,
      });
      return response.data.ClientResp;
    } else {
      dispatch({ type: ADD_COMMENT, payload: response.data });
      dispatch(getPosts());
      return "success";
    }
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      payload: error,
    });
  }
};
