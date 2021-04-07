import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../Actions/User.actions/getUsers";
import UserWrapper from "./userWrapper";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

const AllUsers = ({ getUsers, auth }) => {
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Grid container spacing={4}>
      <UserWrapper users={auth.users} key={auth.UID} />
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { getUsers })(AllUsers);
