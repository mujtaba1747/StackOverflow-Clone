import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
/*import CardMedia from '@material-ui/core/CardMedia';*/
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
//import Answer from "./answer.js";
//import AddAnswer from "./add-answer.js";
import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
import CreateIcon from "@material-ui/icons/Create";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AnswerWrapper from "../../Pages/AllPosts/AnswerWapper";
import AddAnswerWapper from "../../Pages/AllPosts/addAnswerWrapper";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    minWidth: 600,
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },

  expand2: {
    transform: "rotate(0deg)",
    marginLeft: 0,
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },

  answerWrapper: {
    marginTop: "10px",
  },

  /*expandOpen: {
    transform: 'rotate(180deg)',
  },*/
}));

export default function Post(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [expanded2, setExpanded2] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleExpandClick2 = () => {
    setExpanded2(!expanded2);
  };
  // useEffect(() => {
  //   console.log("Key1", props.key1);

  //   if (props.post.Answers !== null) {
  //     console.log(props.post.Qid, props.post.Answers.length);
  //   }
  // }, []);

  return (
    <Card className={classes.root}>
      <CardHeader
        align="left"
        avatar={
          <Avatar
            aria-label="display"
            src={
              props.post.User.GravatarURL
                ? props.post.User.GravatarURL
                : "https://cdn1.iconfinder.com/data/icons/avatar-3/512/Doctor-512.png"
            }
          />
        }
        title={props.post.User.Username}
        subheader={props.post.CreationDate}
      />

      <CardContent align="left">
        <Typography variant="h4" color="textPrimary" component="h1">
          {props.post.Qbody}
        </Typography>
      </CardContent>

      <CardActions>
        {/* <IconButton className={classes.expand}>
          <FavoriteIcon />
          &nbsp;
        </IconButton> */}

        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded2,
          })}
          onClick={handleExpandClick2}
          aria-expanded={expanded2}
          aria-label="write answer"
        >
          <CreateIcon />
        </IconButton>

        <IconButton
          className={clsx(classes.expand2, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show answers"
        >
          <QuestionAnswerOutlinedIcon />
          &nbsp;
          <Typography variant="h5" color="textPrimary" component="h5">
            {props.post.Answers !== null ? props.post.Answers.length : 0}
          </Typography>
        </IconButton>
      </CardActions>

      <Collapse in={expanded2} timeout="auto" unmountOnExit>
        <hr />
        <CardContent>
          <AddAnswerWapper Qid={props.key1} />
        </CardContent>
      </Collapse>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <hr />
        <CardContent>
          <Typography variant="h6" color="textPrimary" component="h6">
            Answers
          </Typography>

          <AnswerWrapper Answers={props.post.Answers} />
        </CardContent>
      </Collapse>
    </Card>
  );
}
