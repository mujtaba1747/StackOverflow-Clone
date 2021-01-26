const express = require("express");
const router = express.Router();
const http = require("http");
const jwt = require("jsonwebtoken");
const auth = require("../Middleware/auth");

//Create question
router.post("/question/add", auth, async (Req, Res) => {
  const Token = Req.header("authentication-token");
  const Username = Req.user;
  const Qbody = Req.body.Qbody;

  const body = {
    User: {
      Username: Username,
      Token: Token,
    },
    Qbody: Qbody,
  };
  const data = JSON.stringify(body);

  const options = {
    hostname: "localhost",
    path: "/question/add",
    method: "POST",
    port: 8080,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      Authorization: Token,
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

//Add Answer
router.post("/answer/add", auth, async (Req, Res) => {
  const Token = Req.header("authentication-token");
  const Reqbody = Req.body;

  const body = {
    Abody: Reqbody.Abody,
  };
  const data = JSON.stringify(body);

  const options = {
    hostname: "localhost",
    path: "/" + Reqbody.Qid + "/answer",
    method: "POST",
    port: 8080,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      Authorization: Token,
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

//Get feed
router.get("/feed", async (Req, Res) => {
  const data = "";

  const options = {
    hostname: "localhost",
    path: "/feed",
    method: "GET",
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

//Get feed of user
router.get("/feed/:Username", async (Req, Res) => {
  const data = "";
  const Username = Req.params.Username;

  const options = {
    hostname: "localhost",
    path: "/" + Username + "/questions",
    method: "GET",
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

//delete question
router.post("/question/:Qid/delete", async (Req, Res) => {
  const Token = Req.header("authentication-token");
  const data = "";
  const Qid = Req.params.Qid;

  const options = {
    hostname: "localhost",
    path: "/question/" + Qid + "/delete",
    method: "POST",
    port: 8080,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      Authorization: Token,
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

//delete Answer
router.post("/answer/:Aid/delete", async (Req, Res) => {
  const Token = Req.header("authentication-token");
  const data = "";
  const Aid = Req.params.Aid;

  const options = {
    hostname: "localhost",
    path: "/answer/" + Aid + "/delete",
    method: "POST",
    port: 8080,
    headers: {
      "Content-Type": "application/json",
      "Content-Length": data.length,
      Authorization: Token,
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

module.exports = router;
