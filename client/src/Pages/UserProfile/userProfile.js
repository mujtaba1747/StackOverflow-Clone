import React from "react";
import { Grid } from "@material-ui/core";
import Profile from "../../Components/profile/profile";

const UserProfile = (props) => {
  const { Username } = props.match.params;
  const { user } = props.location.state;
  console.log("userProfile :> got", Username);
  console.log("userprofile :> got", user);

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

export default UserProfile;
