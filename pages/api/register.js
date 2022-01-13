// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../store/db.js";
import formidable from "formidable-serverless";
import crypto from "crypto";
import nodemailer from "nodemailer";
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

        var transporter = nodemailer.createTransport({
          service: "hotmail",
          auth: {
            user: "traktorland80@hotmail.com",
            pass: "traktorland1000",
          },
        });


        var secret = "traktorlandsecret";
        var ime = fields["ime"];
        var prezime = fields["prezime"];
        var telefon = fields["telefon"];
        var naziv_firme = fields["naziv_firme"];
        var pib = fields["pib"];
        var email = fields["email"];
        var adresa = fields["adresa"];
        var grad = fields["grad"];
        var postanskibroj = fields["postanskibroj"];
        var lozinka = fields["lozinka"];
        var cipher = crypto.createCipher("aes192", secret);
        var encrypted = cipher.update(lozinka, "utf8", "hex");
        encrypted += cipher.final("hex");
        var pravno_lice = 0;
        var d = new Date();

        
        var created =
          d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        if (naziv_firme != undefined) {
          pravno_lice = 1;
        }

        var user = {
          name: ime + " " + prezime,
          phone: telefon,
          naziv_firme: naziv_firme,
          code: pib,
          email: email,
          username: email,
          address: adresa,
          city: grad,
          zip: postanskibroj,
          password: encrypted,
          pravno_lice: pravno_lice,
          active: "y",
          rebatepercent: 0,
          partnertype: "member",
        };

        con.query(
          "SELECT * FROM partner WHERE email = ?",
          [email],
          (err, result) => {
            if (err) throw err;

            if (result.length != 0) {
              res.json({ result: "Error email" });
              resolve();
            } else {
              con.query("INSERT INTO partner SET ?", user, (err, result) => {
                if (err) throw err;
                var mailOptions = {
                  from: "traktorland80@hotmail.com",
                  to: email,
                  subject: "Traktorland",
                  text: "Uspesno ste se registrovali na traktorland",
                  html: "<a href='https://traktorland.rs'>traktorland.rs</a>",
                };
                transporter.sendMail(mailOptions, (err, info) => {
                  
                });
                res.json({ result: "Success" });
                resolve();
              });
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
