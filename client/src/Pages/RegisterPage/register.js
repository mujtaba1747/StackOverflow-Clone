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

import { registerUser } from "../../Actions/Auth.actions/registerUser";

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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

toast.configure();

function RegisterPage({ registerUser, error }) {
  const classes = useStyles();

  const [userData, setUserData] = useState({
    Fname: "",
    Lname: "",
    Username: "",
    Email: "",
    Password: "",
  });

  const { Fname, Lname, Username, Email, Password } = userData;

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
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            {/* fname */}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="Fname"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={Fname}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            {/* lname */}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="Lname"
                autoComplete="lname"
                value={Lname}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            {/*uname */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastname"
                label="User Name"
                name="Username"
                value={Username}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            {/* email */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="Email"
                autoComplete="email"
                value={Email}
                onChange={(e) => onChange(e)}
              />
            </Grid>

            {/* password */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
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
            </Grid>
          </Grid>

          {/* submit */}
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => {
              registerUser(userData).then((res) => {
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
          >
            Sign Up
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  error: state.auth.errors,
});

export default connect(mapStateToProps, { registerUser })(RegisterPage);
