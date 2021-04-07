import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addAnswerToQuestion } from "../../Actions/Post.actions/addAnswer";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    "& .MuiTextField-root": {
      width: 540,
    },
  },
}));

const AddAnswer = ({ Qid, auth, addAnswerToQuestion }) => {
  const classes = useStyles();
  let [Abody, setAbody] = useState("");
  const onChange = (e) => setAbody(e.target.value);
  // console.log("Qid here", Qid);

  return (
    <Card className={classes.root} variant="outlined">
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
        title={auth.user.Username}
        subheader={auth.user.Fname + " " + auth.user.Lname}
      />

      <CardContent align="left">
        <TextField
          id="outlined-multiline-static"
          label="Write your answer"
          multiline
          rows={4}
          variant="outlined"
          value={Abody}
          onChange={(e) => onChange(e)}
        />
      </CardContent>

      <CardActions>
        <Button
          variant="outlined"
          color="inherit"
          onClick={() => {
            if (Abody !== "" && Abody !== null) {
              addAnswerToQuestion(Abody, Qid).then((res) => {
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
            setAbody("");
          }}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = {
  addAnswerToQuestion,
};
export default connect(mapStateToProps, mapDispatchToProps)(AddAnswer);
