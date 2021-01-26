import React from "react";
import Post from "../../Components/post/card";
import { Grid } from "@material-ui/core";

const PostWapper = ({ posts, user }) => {
  //   const classes = useStyles();
  //if (posts.length !== 0) console.log(posts[0].Qid);
  console.log(user);
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
  } else {
    return <div></div>;
  }
};
export default PostWapper;
