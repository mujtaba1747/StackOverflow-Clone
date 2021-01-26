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
