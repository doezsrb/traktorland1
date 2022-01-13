import mysql from "mysql";
import formidable from "formidable-serverless";

export default async (req, res) => {
  return new Promise((resolve) => {
    const con = mysql.createConnection({
      host: "188.93.122.197",
      user: "sajt",
      password: "1",
      database: "gazzele_webmarjanovic",
      connectTimeout: 60 * 60 * 1000,
      acquireTimeout: 60 * 60 * 1000,
      timeout: 60 * 60 * 1000,
    });
    if (req.method == "POST") {
      res.sendStatus = 200;
      res.setHeader("Content-Type", "application/json");
      var email = JSON.parse(req.body).email;
      con.query(
        "SELECT * FROM partner WHERE email = ?",
        [email],
        (err, results) => {
          if (results.length > 0) {
            res.json({ result: "Success", user: results[0] });
            resolve();
          } else {
            res.json({ result: "Failed" });
            resolve();
          }
        }
      );
      con.end();
    } else if (req.method == "GET") {
      if (req.query.id != undefined) {
        con.query(
          "SELECT * FROM partner WHERE partnerid = ? ",
          req.query.id,
          (err, results) => {
            res.json({ user: results });
            resolve();
          }
        );
        con.end();
      } else {
        var offset = req.query.offset;
        con.query(
          "SELECT * FROM partner LIMIT 40 OFFSET " + offset,
          (err, results) => {
            res.json({ result: "Success", users: results });
            resolve();
          }
        );
        con.end();
      }
    } else {
      res.redirect("/");
      res.end();
      resolve();
    }
  });
};
