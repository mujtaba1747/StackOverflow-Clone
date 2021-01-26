import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { createPost } from "../../Actions/Post.actions/createPost";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    minHeight: 350,
    "& .MuiTextField-root": {
      width: 570,
    },
  },

  add: {
    marginLeft: "auto",
  },

  title: {
    fontSize: 13,
  },

  instructions: {
    marginTop: 30,
    backgroundColor: "inherit",
  },
}));

const AddQuestion = ({ auth, createPost }) => {
  const classes = useStyles();

  let [Qbody, setQbody] = useState("");

  const onChange = (e) => setQbody(e.target.value);

  return (
    <Card className={classes.root}>
      <CardHeader
        align="left"
        avatar={
          <Avatar
            aria-label="display"
            src={
              auth.user.GravatarURL
                ? auth.user.GravatarURL
                : "https://cdn1.iconfinder.com/data/icons/avatar-3/512/Doctor-512.png"
            }
          />
        }
        // action={
        //   <IconButton aria-label="cross">
        //     <CloseRoundedIcon />
        //   </IconButton>
        // }
        title={auth.user.Username}
        subheader={auth.user.Fname + " " + auth.user.Lname}
      />

      <CardContent align="left">
        <TextField
          id="standard-textarea"
          label="Add Question"
          placeholder="Start your question with 'What', 'Why', 'How', etc."
          multiline
          value={Qbody}
          onChange={(e) => onChange(e)}
        />

        <Card className={classes.instructions} variant="outlined">
          <CardContent>
            <Typography variant="h6" component="h6">
              How to get good answers quickly?
            </Typography>

            <Typography
              className={classes.title}
              color="textSecondary"
              // gutterTop
            >
              - Keep your question short and to the point.
            </Typography>

            <Typography className={classes.title} color="textSecondary">
              - Double-check grammar and spelling.
            </Typography>

            <Typography className={classes.title} color="textSecondary">
              - Make sure your question isn't repeated.
            </Typography>
          </CardContent>
        </Card>
      </CardContent>

      <CardActions>
        <Button className={classes.add} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button
          className={classes.add}
          variant="contained"
          color="primary"
          onClick={() => {
            if (Qbody !== "" && Qbody !== null) {
              createPost(Qbody).then((res) => {
                if (res !== "success") {
                  toast.error(`${res}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                } else {
                  toast.success(`${res}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                }
              });
            } else {
              toast.error("text is empty", {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            }
            setQbody("");
          }}
        >
          ADD
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {
  createPost,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestion);
