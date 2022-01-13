// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from "mysql";
export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  const con = mysql.createConnection({
    host: "188.93.122.197",
    user: "sajt",
    password: "1",
    database: "gazzele_webmarjanovic",
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
  });
  //SELECT productid FROM product t1 WHERE t1.productid NOT IN (SELECT productid FROM productcategorypr)
  con.query(
    "SELECT * FROM productcategorypr WHERE productid = 1",
    (err, results) => {
      res.json(results);
    }
  );
};
