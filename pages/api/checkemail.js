import con from "../../store/db.js";
import formidable from "formidable-serverless";

export const config = {
  api: {
    bodyParser: false,
  },
};
export default (req, res) => {
  if (req.method == "POST") {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      con.query(
        "SELECT * FROM partner WHERE email = ?",
        [fields["email"]],
        (err, result) => {
          if (err) throw err;

          if (result.length > 0) {
            res.json({ result: "Success" });
          } else {
            res.json({ result: "Failed" });
          }
        }
      );
    });
  } else {
    res.redirect("/");
    res.end();
  }
};
