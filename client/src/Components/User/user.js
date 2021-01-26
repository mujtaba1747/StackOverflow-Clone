import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FaceIcon from "@material-ui/icons/Face";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 350,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function User({ user, match }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={
              user.GravatarURL
                ? user.GravatarURL
                : `https://picsum.photos/seed/${user.Username}/200/300`
            }
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        align="left"
        title={user.Username}
        subheader={user.Fname + " " + user.Lname}
      />

      <CardActions disableSpacing>
        {/* <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<FaceIcon />}
        >
          Profile
        </Button> */}

        <Link
          to={{
            pathname: "/home/" + user.Username + "/userProfile",
            state: { user: user },
          }}
        >
          <IconButton className={classes.button}>
            <FaceIcon />
          </IconButton>
        </Link>

        <Link
          to={{
            pathname: "/home/" + user.Username + "/userQuestion",
          }}
        >
          <IconButton className={classes.button}>
            <QuestionAnswerIcon />
          </IconButton>
        </Link>

        {/* <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          startIcon={<QuestionAnswerIcon />}
        >
          Questions
        </Button> */}
      </CardActions>
    </Card>
  );
}
