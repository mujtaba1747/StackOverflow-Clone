import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const IsLoggedInRoute = ({
  component: Component,
  auth: { isLoggedIn },
  ...rest
}) => {
  console.log(isLoggedIn);
  return (
    <Route
      {...rest}
      render={
        (props) =>
          !isLoggedIn ? <Component {...props} /> : <Redirect to="/home" />
        //   console.log(isLoggedIn)
      }
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(IsLoggedInRoute);
