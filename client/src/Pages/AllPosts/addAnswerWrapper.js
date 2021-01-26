import React from "react";
import AddAnswer from "../../Components/post/add-answer";
const AddAnswerWapper = (props) => {
  return (
    <div>
      <AddAnswer Qid={props.Qid} />
    </div>
  );
};
export default AddAnswerWapper;
