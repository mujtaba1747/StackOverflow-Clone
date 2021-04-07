import React from "react";

import Answer from "../../Components/post/answer";

const AnswerWrapper = ({ Answers, user }) => {
  //   const classes = useStyles();
  //console.log(Answers.length);
  return (
    Answers !== null &&
    Answers !== [] &&
    Answers !== {} &&
    Answers.map((ans) => (
      <div style={{ marginTop: "10px" }}>
        <Answer key={ans.Aid} ans={ans} user={user} />
      </div>
    ))
  );
};
export default AnswerWrapper;
