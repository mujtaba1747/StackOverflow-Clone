import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LinkM from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginUser } from "../../Actions/Auth.actions/loginUser";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <LinkM color="inherit" href="https://material-ui.com/">
        Your Website
      </LinkM>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginPage = ({ loginUser, error }) => {
  const classes = useStyles();

  const [userData, setUserData] = useState({
    Email: "",
    Password: "",
  });

  const { Email, Password } = userData;

  const onChange = (e) =>
    setUserData({ ...userData, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="Email"
            autoComplete="email"
            autoFocus
            value={Email}
            onChange={(e) => onChange(e)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="Password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={Password}
            onChange={(e) => onChange(e)}
          />

          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) =>
              loginUser(userData).then((res) => {
                if (res !== "success") {
                  toast.error(`${res}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                } else {
                  toast.success(`${res}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  });
                }
              })
            }
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link
                to="/register"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  error: state.auth.errors,
});

export default connect(mapStateToProps, { loginUser })(LoginPage);
