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
    if (req.query.search != undefined) {
      var search = req.query.search;
      var offset = req.query.offset;
      con.query(
        "SELECT * FROM partner WHERE name LIKE ? ORDER BY name ASC LIMIT 40 OFFSET " +
          offset,
        ["%" + search + "%"],
        (err, results) => {
          res.json({ results });
          resolve();
        }
      );
      con.end();
    }
  });
};
