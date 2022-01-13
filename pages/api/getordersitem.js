import mysql from "mysql";

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
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (req.query.id != undefined) {
      var id = req.query.id;
      con.query(
        "SELECT * FROM documentitem WHERE documentid = ?",
        id,
        function (err, result, fields) {
          if (err) throw err;
          res.json(result);
          resolve();
        }
      );
      con.end();
    }
  });
};
