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
        var id = fields["id"];
        var value = fields["value"];
        con.query(
          "UPDATE document SET zavrsen = ? WHERE documentid = ?",
          [value, id],
          (err, fields, result) => {
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
