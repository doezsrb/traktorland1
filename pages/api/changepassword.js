// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../store/db.js";
import formidable from "formidable-serverless";

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
        con.query(
          "UPDATE partner SET password = ? WHERE email = ?",
          [fields["password"], fields["email"]],
          (err, results, fields) => {
            if (err) {
              res.json({ result: "Failed" });
              resolve();
            }
            if (results.changedRows == 0) {
              res.json({ result: "Failed" });
              resolve();
            } else {
              res.json({ result: "Success" });
              resolve();
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
