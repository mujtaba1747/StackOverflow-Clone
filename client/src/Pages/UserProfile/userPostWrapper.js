import React from "react";
import Post from "../../Components/post/card";
import { Grid } from "@material-ui/core";

const UserPostWapper = ({ posts, user }) => {
  //   const classes = useStyles();
  // console.log(user);
  if (posts == null) {
    return (
      <div style={{ margin: "auto", width: " 100%", padding: "10px" }}>
        <h1>No post</h1>
      </div>
    );
  }
  if (posts.length === 0) {
    console.log("zero");
    return (
      <div style={{ margin: "auto", width: " 100%", padding: "10px" }}>
        <h1>No post</h1>
      </div>
    );
  }
  if (posts.length !== 0) {
    return (
      posts !== null &&
      posts !== [] &&
      posts !== {} &&
      posts.map((post) => (
        <Grid item={true} xs={12}>
          <div style={{ margin: "auto", width: " 50%", padding: "10px" }}>
            <Post key1={post.Qid} post={post} user={user} />
          </div>
        </Grid>
      ))
    );
  }
};
export default UserPostWapper;
