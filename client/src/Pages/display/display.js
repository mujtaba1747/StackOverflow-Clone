import React from "react";
import "./display.css";
import logo from "./Assets/logo.png";
import img from "./Assets/hero-1.png";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="App">
      <Paper elevation={0}>
        <div style={{ marginTop: "30px" }}>
          <img
            src={logo}
            alt="logo"
            height="70px"
            width="300px"
            style={{ marginRight: "300px" }}
          />
          <img
            src="https://cleanmyholdingtanks.com/wp-content/uploads/2018/02/blog-icon-QandA.gif"
            alt="logo2"
            height="80px"
            width="80px"
            style={{ marginLeft: "300px" }}
          />
          Forum
        </div>
        <div>
          <img src={img} alt="img" style={{ marginTop: "60px" }} />
        </div>
        <div style={{ marginTop: "30px" }}>
          <h1>A place to share knowledge and ideas</h1>
        </div>
        <div style={{ marginTop: "30px" }}>
          <h2> Ask, Answer, Discuss</h2>
        </div>
        <div style={{ marginTop: "10px" }}>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "20px" }}
            >
              SIGN UP
            </Button>
          </Link>
          <Link to="/login" style={{ textDecoration: "none" }}>
            <Button
              variant="contained"
              color="secondary"
              style={{ margin: "20px" }}
            >
              Login
            </Button>
          </Link>
        </div>
      </Paper>
    </div>
  );
};

export default Landing;
