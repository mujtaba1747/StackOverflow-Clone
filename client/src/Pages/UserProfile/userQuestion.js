import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import axios from "axios";
import { connect } from "react-redux";
import { getUsersPosts } from "../../Actions/Post.actions/getUsersPosts";
import UserPostWrapper from "../../Pages/UserProfile/userPostWrapper";

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

const UserQuestions = ({ match, user, getUsersPosts, profilePosts }) => {
  const { Username } = match.params;
  console.log("userProfile :> got", Username);

  // const [userQuestions, setUserQuestions] = useState([]);

  useEffect(() => {
    getUsersPosts(Username);
    // axios("http://localhost:5000/api/posts/feed/" + Username).then((res) => {
    //   setUserQuestions(res.data);
    // });
  }, []);
  // console.log(userQuestions);

  const classes = useStyles();

  return (
    <div className={classes.root} style={{ overflow: "hidden" }}>
      <Grid container spacing={3}>
        <UserPostWrapper posts={profilePosts} user={user} />
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  profilePosts: state.user.profilePosts,
});

export default connect(mapStateToProps, { getUsersPosts })(UserQuestions);
