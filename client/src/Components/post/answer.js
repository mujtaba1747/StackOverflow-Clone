import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
/*import CardMedia from '@material-ui/core/CardMedia';*/
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
//import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
//import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
//import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
//import MoreVertIcon from "@material-ui/icons/MoreVert";
//import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
//import { NavigateBeforeSharp } from "@material-ui/icons";
import KeyboardArrowUpOutlinedIcon from "@material-ui/icons/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@material-ui/icons/KeyboardArrowDownOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import { connect } from "react-redux";
import { deleteAnswer } from "../../Actions/Post.actions/deleteAnswer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import Comment from "./comment.js";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 600,
    minWidth: 500,
  },

  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
}));

const Answer = ({ ans, user, deleteAnswer }) => {
  const classes = useStyles();
  //const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };
  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        align="left"
        avatar={
          <Avatar
            aria-label="display"
            src={
              ans.User.GravatarURL
                ? ans.User.GravatarURL
                : "https://cdn1.iconfinder.com/data/icons/avatar-3/512/Doctor-512.png"
            }
          />
        }
        title={ans.User.Username}
        subheader={"Answered, " + ans.CreationDate}
      />

      <CardContent align="left">
        <Typography variant="body2" color="textPrimary" component="p">
          {ans.Abody}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton className={classes.expand} color="inherit">
          <KeyboardArrowUpOutlinedIcon />
          <Typography variant="h6" color="textPrimary" component="h6">
            5
          </Typography>
        </IconButton>
        <IconButton color="inherit">
          <KeyboardArrowDownOutlinedIcon />
          <Typography variant="h6" color="textPrimary" component="h6">
            4
          </Typography>
        </IconButton>
        {user.Username === ans.User.Username ? (
          <IconButton color="inherit">
            <DeleteIcon
              onClick={() => {
                deleteAnswer(ans.Aid, ans.User.Username).then((res) => {
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
              }}
            />
          </IconButton>
        ) : null}

        {/* <Button
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
        >
          Comments (3)
          <ExpandMoreIcon />
        </Button> */}
      </CardActions>
      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Comment />
      </Collapse> */}
    </Card>
  );
};
export default connect(null, { deleteAnswer })(Answer);
