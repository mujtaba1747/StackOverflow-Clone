import React from "react";
import CreateQuestion from "../../Components/create_question/createQuestion";
import Grid from "@material-ui/core/Grid";
// import { connect } from "react-redux";

const AddQuestion = () => {
  return (
    <Grid container spacing={3}>
      <Grid item={true} xs={12}>
        <div style={{ margin: "100px auto", width: " 50%", padding: "10px" }}>
          <CreateQuestion />
        </div>
      </Grid>
    </Grid>
  );
};

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   posts: state.posts,
// });

export default AddQuestion;

// export default connect(mapStateToProps,null)( AddQuestion);
