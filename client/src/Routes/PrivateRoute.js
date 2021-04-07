import React from "react";
import { Redirect, Route } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isLoggedIn },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isLoggedIn ? <Redirect to="/login" /> : <Component {...props} />
    }
  />
);

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
