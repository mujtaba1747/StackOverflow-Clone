import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Fab from "@material-ui/core/Fab";
import SwitchM from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
//Import pages
import SignIn from "./Pages/LoginPage/login";
import RegisterPage from "./Pages/RegisterPage/register";
import HomePage from "./Pages/HomePage/home";
//import LandingPage from "./Pages/LandingPage/ landing";
import Landing from "./Pages/display/display";

//Redux
import { Provider } from "react-redux";
import store from "./store";

//Routes
import IsLoggedInRoute from "./Routes/isLoggedInRoute";
import PrivateRoute from "./Routes/PrivateRoute";

//Actions
import { userLoaded } from "./Actions/Auth.actions/userLoaded";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    maxHeight: 5,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -50,
    right: 10,
    margin: "auto",
  },
}));

function App() {
  useEffect(() => {
    store.dispatch(userLoaded());
  }, []);
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
  const theme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });
  const classes = useStyles();
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };
  return (
    <ThemeProvider theme={theme}>
      <div style={{ overflow: "hidden" }}>
        <Router>
          <Provider store={store}>
            <Switch>
              <Route exact path="/" component={Landing} />
              <IsLoggedInRoute path="/login" exact component={SignIn} />
              <IsLoggedInRoute
                path="/register"
                exact
                component={RegisterPage}
              />
              <PrivateRoute path="/home" component={HomePage} />
            </Switch>
          </Provider>
        </Router>
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
          <Toolbar>
            {/* <IconButton edge="start" color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton> */}
            <Fab
              color="primary"
              aria-label="add"
              variant="extended"
              className={classes.fabButton}
            >
              <SwitchM checked={darkState} onChange={handleThemeChange} />
              Darkmode
            </Fab>
            {/* <div className={classes.grow} /> */}
            {/* <IconButton color="inherit">
              <SearchIcon />
            </IconButton> */}
            {/* <IconButton edge="end" color="inherit">
              <MoreIcon />
            </IconButton> */}
          </Toolbar>
        </AppBar>
      </div>
    </ThemeProvider>
  );
}

export default App;
