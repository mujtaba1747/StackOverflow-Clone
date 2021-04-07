import React from "react";
import User from "../../Components/User/user";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  cardContainer: {
    marginTop: "40px",
  },
});

const UsersWrapper = ({ users }) => {
  const classes = useStyles();
  return (
    users !== null &&
    users !== [] &&
    users !== {} &&
    users.map((user) => (
      <Grid item={true} xs={12} sm={6} md={4} className={classes.cardContainer}>
        <User key={user.UID} user={user} />
      </Grid>
    ))
  );
};
export default UsersWrapper;
