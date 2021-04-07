const express = require("express");
const router = express.Router();
const http = require("http");
const jwt = require("jsonwebtoken");
const auth = require("../Middleware/auth");

//Register
router.post("/user/register", async (Req, Res) => {
  //   console.log(Req.body);
  const data = JSON.stringify(Req.body);

  const options = {
    hostname: "localhost",
    path: "/user/register",
    method: "POST",
    port: 8080,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const req = http
    .request(options, (res) => {
      let data = "";

      console.log("Status Code:", res.statusCode);

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        // const response = JSON.parse(data);
        Res.send(data);
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message);
    });

  req.write(data);
  req.end();
});

//Login
router.post("/user/login", async (Req, Res) => {
  //   console.log(Req.body);
  const data = JSON.stringify(Req.body);

  const options = {
    hostname: "localhost",
    path: "/user/login",
    method: "POST",
    port: 8080,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
    },
  };

  const req = http
    .request(options, (res) => {
      let data = "";

      console.log("Status Code:", res.statusCode);

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        // const response = JSON.parse(data);
        Res.send(data);
      });
    })
    .on("error", (err) => {
      console.log("Error: ", err.message);
    });

  req.write(data);
  req.end();
});

//Get user by token middleware
// router.get("/user/getDetails", auth, async (Req, Res) => {
//   const Username = Req.user;
//   console.log(Username);
//   const data = "";

//   const options = {
//     hostname: "localhost",
//     path: "/user/" + Username,
//     method: "GET",
//     port: 8080,
//     headers: {
//       "Content-Type": "application/json",
//       "Content-Length": data.length,
//     },
//   };

//   const req = http
//     .request(options, (res) => {
//       let data = "";

//       console.log("Status Code:", res.statusCode);

//       res.on("data", (chunk) => {
//         data += chunk;
//       });

//       res.on("end", () => {
//         // const response = JSON.parse(data);
//         Res.send(data);
//       });
//     })
//     .on("error", (err) => {
//       console.log("Error: ", err.message);
//     });

//   req.write(data);
//   req.end();
// });

//Get all users
// router.get("/users", async (Req, Res) => {
//   const Token = Req.header("authentication-token");
//   const data = "";

//   const options = {
//     hostname: "localhost",
//     path: "/users",
//     method: "GET",
//     port: 8080,
//     headers: {
//       "Content-Type": "application/json",
//       "Content-Length": data.length,
//       Authorization: Token,
//     },
//   };

//   const req = http
//     .request(options, (res) => {
//       let data = "";

//       console.log("Status Code:", res.statusCode);

//       res.on("data", (chunk) => {
//         data += chunk;
//       });

//       res.on("end", () => {
//         // const response = JSON.parse(data);
//         Res.send(data);
//       });
//     })
//     .on("error", (err) => {
//       console.log("Error: ", err.message);
//     });

//   req.write(data);
//   req.end();
// });

//Create question
// router.post("/question/add", auth, async (Req, Res) => {
//   const Token = Req.header("authentication-token");
//   const Username = Req.user;
//   const Qbody = Req.body.Qbody;

//   const body = {
//     User: {
//       Username: Username,
//       Token: Token,
//     },
//     Qbody: Qbody,
//   };
//   const data = JSON.stringify(body);

//   const options = {
//     hostname: "localhost",
//     path: "/question/add",
//     method: "POST",
//     port: 8080,
//     headers: {
//       "Content-Type": "application/json",
//       "Content-Length": data.length,
//       Authorization: Token,
//     },
//   };

//   const req = http
//     .request(options, (res) => {
//       let data = "";

//       console.log("Status Code:", res.statusCode);

//       res.on("data", (chunk) => {
//         data += chunk;
//       });

//       res.on("end", () => {
//         // const response = JSON.parse(data);
//         Res.send(data);
//       });
//     })
//     .on("error", (err) => {
//       console.log("Error: ", err.message);
//     });

//   req.write(data);
//   req.end();
// });

//Get feed
// router.get("/feed", async (Req, Res) => {
//   const data = "";

//   const options = {
//     hostname: "localhost",
//     path: "/feed",
//     method: "GET",
//     port: 8080,
//     headers: {
//       "Content-Type": "application/json",
//       "Content-Length": data.length,
//     },
//   };

//   const req = http
//     .request(options, (res) => {
//       let data = "";

//       console.log("Status Code:", res.statusCode);

//       res.on("data", (chunk) => {
//         data += chunk;
//       });

//       res.on("end", () => {
//         // const response = JSON.parse(data);
//         Res.send(data);
//       });
//     })
//     .on("error", (err) => {
//       console.log("Error: ", err.message);
//     });

//   req.write(data);
//   req.end();
// });

module.exports = router;
