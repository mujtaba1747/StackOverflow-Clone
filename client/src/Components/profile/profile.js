// import Avatar from "@material-ui/core/Avatar";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import clsx from "clsx";
// import Collapse from "@material-ui/core/Collapse";
// import IconButton from "@material-ui/core/IconButton";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
// import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
// import { Autorenew, NavigateBeforeSharp } from "@material-ui/icons";
// import QuestionAnswerOutlinedIcon from "@material-ui/icons/QuestionAnswerOutlined";
// import EditIcon from "@material-ui/icons/Edit";
// import CreateIcon from "@material-ui/icons/Create";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
// import CardActions from "@material-ui/core/CardActions";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 850,
    minWidth: 850,
    minHeight: 700,
    //display: 'flex'
    //backgroundColor: "#e6eeff",
  },

  cover: {
    width: 150,
    height: 150,
    margin: "auto",
    borderRadius: "50%",
    //display: 'flex',
    //flexDirection: 'column',
    //marginLeft: '22%',
    marginTop: "8%",
    //paddingLeft: theme.spacing(1),
  },

  content: {
    //marginRight: 'auto',
    paddingTop: "20px",
    flex: "auto",
    display: "flex",
    flexDirection: "column",
    width: "40%",
    margin: "auto",
    marginTop: "4%",
    //marginTop: '5%',
    //marginLeft: '3%',
  },
}));

const Profile = ({ user }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        title={user.Username}
        //style={{ backgroundColor: "#33a6cc" }}
      ></CardHeader>
      <hr />
      <CardMedia
        className={classes.cover}
        image={
          user.GravatarURL
            ? user.GravatarURL
            : "https://cdn1.iconfinder.com/data/icons/avatar-3/512/Doctor-512.png"
        }
      ></CardMedia>

      <CardContent className={classes.content}>
        {/*<Typography component="h4" variant="h4">
            savenger12
           {/* <IconButton>
                <CreateIcon />
           </IconButton> 
          </Typography>
          <Typography component="h5" variant="h5">
            Savani Suranglikar
            {/* <IconButton>
                <CreateIcon />
           </IconButton> 
          </Typography>
          <Typography variant="subtitle1">
            savani.456@gmail.com
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Credentials
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            Joined on 20 November, 2020
          </Typography> */}

        <List component="nav">
          <ListItem>
            <ListItemText secondary="Username" />
            {user.Username}
          </ListItem>
          <Divider />
          <ListItem divider>
            <ListItemText secondary="First Name" />
            {user.Fname}
          </ListItem>
          <ListItem divider>
            <ListItemText secondary="Last Name" />
            {user.Lname}
          </ListItem>
          <ListItem divider>
            <ListItemText secondary="Email id" />
            {user.Email}
          </ListItem>
          <ListItem divider>
            <ListItemText secondary="Joined" />
            {user.CreationDate}
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default Profile;
