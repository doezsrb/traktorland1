// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../store/db.js";
import formidable from "formidable-serverless";
import jwt from "jsonwebtoken";
import crypto from "crypto";
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
        var email = fields["email"];
        var password = fields["password"];

        con.query(
          "SELECT * FROM partner WHERE email = ?",
          [email],
          (err, result) => {
            if (err) throw err;

            if (result.length == 0) {
              res.json({ result: "Failed" });
              resolve();
            } else {
              var secret = "traktorlandsecret";
              var decipher = crypto.createDecipher("aes192", secret);
              var encrypted = result[0].password;
              var decrypted = decipher.update(encrypted, "hex", "utf8");
              decrypted += decipher.final("utf8");
              if (password == decrypted) {
                var secret = "traktorlandsecret";
                var username = email;
                var token = jwt.sign({ username: username }, secret);
                res.json({
                  result: "Success",
                  authToken: token,
                  user: result[0],
                });
                resolve();
              } else {
                res.json({ result: "Failed" });
                resolve();
              }
            }
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
