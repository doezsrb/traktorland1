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
    if (req.query.id != undefined) {
      var id = req.query.id;
      con.query("SELECT * FROM akcija2 WHERE id = ?", id, (err, results) => {
        var res2;
        if (results.length != 0) {
          res2 = results[0];
        } else {
          res2 = [];
        }
        res.json({ data: res2 });

        res.end();
        resolve();
      });
      con.end();
    } else {
      con.query("SELECT * FROM akcija2 ", (err, results) => {
        res.json({ data: results });

        resolve();
      });
      con.end();
    }
  });
};
