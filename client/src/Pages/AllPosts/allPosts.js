import React, { useEffect } from "react";
import { getPosts } from "../../Actions/Post.actions/getPosts";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import PostWrapper from "./postWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    alignItems: "center",
  },
}));

const AllPosts = ({ getPosts, posts, user }) => {
  useEffect(() => {
    getPosts();
  }, []);
  const classes = useStyles();
  return (
    <div className={classes.root} style={{ overflow: "hidden" }}>
      <Grid container spacing={3}>
        <PostWrapper posts={posts.posts} user={user} />
      </Grid>
    </div>
  );
};
const mapStateToProps = (state) => ({
  posts: state.posts,
  user: state.auth.user,
});
const mapDispatchToProps = {
  getPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(AllPosts);
