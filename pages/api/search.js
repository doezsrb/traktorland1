import mysql from "mysql";
import formidable from "formidable-serverless";
var globallimit = 10;
var globaloffset = 0;
var globaldata = [];
var globaldata4off = [];
var globalsearch = "";
var limit_ = 0;
const getCategoryFinish = function (item) {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM categorypr WHERE categoryprid = ?",
      [item.kategorijaid],
      (err, results) => {
        if (results.length == 0) {
          resolve("false");
        } else {
          if (results[0].parentid == null || results[0].parentid == "") {
            item["kategorija"] = results[0].name;
            resolve(item);
          } else {
            con.query(
              "SELECT * FROM categorypr WHERE categoryprid = ?",
              [results[0].parentid],
              (err, results) => {
                item["kategorija"] = results[0].name;
                resolve(item);
              }
            );
          }
        }
      }
    );
  });
};
const getCategory = function (item) {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM productcategorypr WHERE productid = ?",
      [item.productid],
      (err, results) => {
        if (results.length == 0) {
          resolve("false");
        } else {
          item["kategorijaid"] = results[0].categoryprid;
          resolve(item);
        }
      }
    );
  });
};
const getData = function (sea) {
  return new Promise((resolve, reject) => {
    var search = sea;
    var offset = globaloffset;

    con.query(
      "SELECT * FROM product WHERE name LIKE ? ORDER BY productid ASC LIMIT " +
        limit_ +
        " OFFSET " +
        offset,
      "%" + search + "%",
      async (err, results) => {
        if (results.length == 0) {
          resolve("end");
        }
        var forfinish = [];

        for (let item of results) {
          var value = await getCategory(item).then((val) => {
            return val;
          });
          if (value != "false") {
            forfinish.push(value);
          }
        }
        if (forfinish.length == 0) {
          resolve("allno");
        } else {
          for (let item of forfinish) {
            var value = await getCategoryFinish(item).then((val) => {
              return val;
            });
            if (!globaldata4off.includes(value.productid)) {
              globaldata.push(value);
              globaldata4off.push(value.productid);
            }
          }
          resolve("next");
        }
      }
    );
  });
};

function loop(promise, res) {
  return promise.then((val) => {
    if (val == "end") {
      res.json({ results: globaldata });

      globaldata = [];
      globaloffset = 0;
      globalsearch = "";
    } else if (val == "allno") {
      if (limit_ == 40) {
        globaloffset += 40;
      } else {
        globaloffset += 10;
      }
      return loop(getData(globalsearch), res);
    } else {
      if (globaldata.length >= limit_) {
        res.json({ results: globaldata });
        globaldata = [];
        globaloffset = 0;
        globalsearch = "";
      } else {
        if (limit_ == 40) {
          globaloffset += 40;
        } else {
          globaloffset += 10;
        }
        return loop(getData(globalsearch), res);
      }
    }
  });
}

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
    if (req.query.search != undefined && req.query.tip == undefined) {
      globalsearch = req.query.search;
      limit_ = req.query.limit;
      var offset;
      if (req.query.offset != null) {
        offset = req.query.offset;
      } else {
        offset = 0;
      }
      con.query(
        "SELECT t1.*, t2.*,t3.name AS categoryname,t4.name AS categoryparentname FROM product t1 INNER JOIN productcategorypr t2 ON t1.productid = t2.productid INNER JOIN categorypr t3 ON t3.categoryprid = t2.categoryprid INNER JOIN categorypr t4 ON t4.categoryprid = t3.parentid WHERE t1.name LIKE ? AND t1.active = 'y' LIMIT 10 OFFSET " +
          offset,
        "%" + globalsearch + "%",
        async (err, results) => {
          if (err) throw err;
          console.log(results.length);
          res.json({ results });
          resolve();
        }
      );
      con.end();
    } else if (req.query.search != undefined && req.query.tip != undefined) {
      var search = req.query.search;
      var tip = req.query.tip;
      con.query(
        "SELECT * FROM product WHERE name LIKE ? AND type = ? AND active = 'y' ORDER BY name ASC LIMIT 10",
        [search + "%", tip],
        (err, results) => {
          res.json({ results });
          resolve();
        }
      );
      con.end();
    } else if (req.query.resetglobal != undefined) {
      globaldata4off = [];
      res.json({ msg: "success" });
      resolve();
    }
  });
};
