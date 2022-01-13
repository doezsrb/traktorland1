// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../store/db.js";
import formidable from "formidable-serverless";
import uploadImage from "../../store/uploadgc";
import fs from "fs";
const gc = require("../../store/uploadgc/config/");
var imageUrl = "";
var image4db = "";
var nameImg = "";
var folder = "upload";
export const config = {
  api: {
    bodyParser: false,
  },
};
export default async (req, res) => {
  return new Promise((resolve) => {
    if (req.method == "POST") {
      res.sendStatus = 200;
      res.setHeader("Content-Type", "application/json");

      const form = new formidable.IncomingForm();

      form.parse(req, (err, fields, files) => {
        var thumb;
        if (files.thumb != undefined) {
          if (
            fields["oldthumb"] != "/upload/default.png" &&
            fields["oldthumb"] != ""
          ) {
            var imageurl = fields["oldthumb"];
            var imageurl2 = imageurl.split("/");
            imageurl2 = imageurl2.slice(4, imageurl2.length + 1).join("/");
            gc.bucket("traktorland").file(imageurl2).delete();
          }

          nameImg = files.thumb.name;
          var thumbfile = files.thumb;

          var randomNum1 = Math.floor(Math.random() * 10000 + 10);
          var randomNum2 = Math.floor(Math.random() * 10000 + 10);
          var randomNum3 = Math.floor(Math.random() * 10000 + 10);
          var replaced = nameImg.replace(/ /g, "_");
          var finishPath =
            folder + "/" + randomNum1 + randomNum2 + randomNum3 + replaced;
          fs.readFile(thumbfile.path, function (err, buffer) {
            uploadImage(finishPath, buffer);
          });
        }

        if (nameImg == "") {
          thumb = "";
        } else {
          thumb = `https://storage.googleapis.com/traktorland/${finishPath}`;
        }

        var ime = fields["ime"];
        var proizvodjac = fields["proizvodjac"];
        var kataloski_broj = fields["kataloski_broj"];
        var rabat_1 = fields["rabat_1"] == "" ? 0 : fields["rabat_1"];
        var rabat_2 = fields["rabat_2"] == "" ? 0 : fields["rabat_2"];
        var rabat_3 = fields["rabat_3"] == "" ? 0 : fields["rabat_3"];
        var zemlja_porekla = fields["zemlja_porekla"];
        var thumb = thumb;
        var id = fields["id"];
        var tip2 = "";

        if (thumb == "") {
          con.query(
            `UPDATE product SET rabat_1=?,rabat_2=?,rabat_3=?,zemlja_porekla=?,name = ?,manufname=?,kataloski_broj=?
           WHERE productid = ?`,
            [
              rabat_1,
              rabat_2,
              rabat_3,
              zemlja_porekla,
              ime,
              proizvodjac,
              kataloski_broj,
              id,
            ],
            (err, result) => {
              if (err) throw err;
              res.json({ result: "Success" });
              resolve();
            }
          );
        } else {
          con.query(
            `UPDATE product SET rabat_1=?,rabat_2=?,rabat_3=?,zemlja_porekla=?,name = ?,manufname=?,kataloski_broj=?,
           thumb=? WHERE productid = ?`,
            [
              rabat_1,
              rabat_2,
              rabat_3,
              zemlja_porekla,
              ime,
              proizvodjac,
              kataloski_broj,
              thumb,
              id,
            ],
            (err, result) => {
              if (err) throw err;
              res.json({ result: "Success" });
              resolve();
            }
          );
        }
      });
    } else {
      res.redirect("/");
      res.end();
      resolve();
    }
  });
};
