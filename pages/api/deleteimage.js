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
        var id = fields["id"];
        var imageurl = fields["oldthumb"];
        var thumb = "";
        var imageurl2 = imageurl.split("/");
        imageurl2 = imageurl2.slice(4, imageurl2.length + 1).join("/");
        gc.bucket("traktorland").file(imageurl2).delete();
        con.query(
          "UPDATE product SET thumb = ? WHERE productid = ?",
          [thumb, id],
          (err, results) => {
            if (err) throw err;
            res.json({ result: "Success" });
            resolve();
          }
        );
      });
    } else {
      res.redirect("/");
      res.end();
      resolve();
    }
  });
};
