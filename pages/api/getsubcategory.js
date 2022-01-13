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

    var name = req.query.name;
    if (name == "delovi") {
      name = "Delovi Za Poljoprivredne Mašine";
    } else if (name == "mehanizacija") {
      name = "Poljoprivredna Mehanizacija";
    }
    con.query(
      "SELECT * FROM categorypr WHERE name LIKE ? ",
      [name],
      function (err, result, fields) {
        if (err) throw err;
        var id = result[0].categoryprid;
        con.query(
          "SELECT * FROM categorypr WHERE parentid = ?",
          [id],
          function (err, result) {
            res.json(result);
            resolve();
          }
        );
        con.end();
      }
    );
  });
};
