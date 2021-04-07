const express = require("express");
const morgan = require("morgan"); //Morgan is a HTTP request logger middleware for Node.js. It simplifies the process of logging requests to your application
const bodyParser = require("body-parser"); //Body-parser is the Node.js body parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before you handle it.
const cors = require("cors");
//config.env to ./config/config.env
require("dotenv").config({
  path: "./config/config.env",
});

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//Config only for devlopment
if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
  //CORS its allows to dealing with react at localhost at port 3000 without any problem
  app.use(morgan("dev"));
  //Morgan gives information about each request
}

//Load all routes
const authRouter = require("./routes/authroute");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");

//use routes
app.use("/api/", authRouter);
app.use("/api/users/", userRouter);
app.use("/api/posts/", postRouter);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page not found",
  });
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
