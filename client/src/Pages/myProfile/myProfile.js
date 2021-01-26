import React from "react";
import Profile from "../../Components/profile/profile";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

const MyProfile = ({ user }) => {
  return (
    <Grid container spacing={3}>
      <Grid item={true} xs={12}>
        <div style={{ margin: "auto", width: " 73%" }}>
          <Profile user={user} />
        </div>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(MyProfile);
