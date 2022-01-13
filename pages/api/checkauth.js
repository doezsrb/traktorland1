import Cookies from "cookies";
import jwt from "jsonwebtoken";

export default async (req, res) => {
  return new Promise((resolve) => {
    res.sendStatus = 200;
    res.setHeader("Content-Type", "application/json");
    var authToken = req.headers["auth-token"];
    if (authToken == undefined) {
      var cookies = new Cookies(req, res);
      authToken = cookies.get("auth-token");
    }
    jwt.verify(authToken, "traktorlandsecret", function (err, decoded) {
      if (err) {
        res.json({ result: "Failed" });
        resolve();
      } else {
        res.json({ result: "Success", email: decoded.username });

        resolve();
      }
    });
  });
};
