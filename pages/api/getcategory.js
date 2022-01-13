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
      con.query("SELECT * FROM categorypr WHERE id = ?", id, (err, results) => {
        res.json({ data: results[0] });

        resolve();
      });
      con.end();
    } else if (req.query.idfparent != undefined) {
      var id = req.query.idfparent;
      var obj = {};
      con.query(
        "SELECT * FROM categorypr WHERE categoryprid = ?",
        id,
        (err, result) => {
          var targetCategory = result;
          if (result[0].parentid == 0) {
            obj["parent"] = false;
            obj["category"] = targetCategory;
            con.query(
              "SELECT * FROM categorypr WHERE parentid = ?",
              [targetCategory[0].categoryprid],
              (err, result) => {
                obj["subcategory"] = result;
                res.json(obj);

                resolve();
              }
            );
            con.end();
          } else {
            con.query(
              "SELECT * FROM categorypr WHERE categoryprid = ?",
              [result[0].parentid],
              (err, result) => {
                obj["parent"] = result;
                obj["category"] = targetCategory;
                con.query(
                  "SELECT * FROM categorypr WHERE parentid = ?",
                  [result[0].categoryprid],
                  (err, result) => {
                    obj["subcategory"] = result;
                    res.json(obj);

                    resolve();
                  }
                );
                con.end();
              }
            );
          }
        }
      );
    } else if (req.query.productid != undefined) {
      var id = req.query.productid;
      con.query(
        "SELECT * FROM productcategorypr WHERE productid = ?",
        id,
        (err, results) => {
          res.json({ data: results });

          resolve();
        }
      );
      con.end();
    } else if (req.query.name != undefined) {
      var name = req.query.name;
      if (name == "delovi") {
        name = "Delovi Za Poljoprivredne Mašine";
      } else if (name == "mehanizacija") {
        name = "Poljoprivredna Mehanizacija";
      }
      con.query(
        "SELECT * FROM categorypr WHERE name LIKE ?",
        name,
        (err, results) => {
          con.query(
            "SELECT * FROM categorypr WHERE parentid = ?",
            [results[0].categoryprid],
            (err, result) => {
              res.json({ result });

              resolve();
            }
          );
          con.end();
        }
      );
    } else {
      con.query("SELECT * FROM categorypr ", (err, results) => {
        res.json({ data: results });

        resolve();
      });
      con.end();
    }
  });
};
