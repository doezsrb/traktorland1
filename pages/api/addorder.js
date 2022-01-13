// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import con from "../../store/db.js";
import formidable from "formidable-serverless";
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

      var transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
          user: "traktorland80@hotmail.com",
          pass: "traktorland1000",
        },
      });

      const form = new formidable.IncomingForm();

      form.parse(req, (err, fields, files) => {
        var order = JSON.parse(fields["postData"]);
        var price = 0;
        var price2 = 0;
        var partnerid = 9999;
        var userrabat = fields["userrabat"];
        var allorders = JSON.parse(fields["items"]);
        var rows = "";

        // if(order["partnerid"] == undefined){
        //   partnerid = 9999;
        // }else{
        //   partnerid = order["partnerid"]
        // }

        allorders.map((item, index) => {
          var cena = Number(item.qty) * Number(item.price);
          price = price + cena;
          if (userrabat == 1) {
            var cena2 = Number(item.qty) * Number(item.price1);
            price2 = price2 + cena2;
          } else if (userrabat == 2) {
            var cena2 = Number(item.qty) * Number(item.price2);
            price2 = price2 + cena2;
          } else if (userrabat == 3) {
            var cena2 = Number(item.qty) * Number(item.price3);
            price2 = price2 + cena2;
          } else {
            var cena2 = Number(item.qty) * Number(item.price);
            price2 = price2 + cena2;
          }
        });

        var d = new Date();
        var created =
          d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
        var time = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

        var d2 = new Date();
        var created2 =
          d2.getFullYear() + "-" + (d2.getMonth() + 1) + "-" + d2.getDate();
        var firma = "";
        var pib_code = "";
        if (order["pravno_lice"] != 1) {
          var partneraddress4db = {
            address: order["address"],
            city: order["city"],
            zip: order["zip"],
            partnerid: partnerid,
            email: order["email"],
            phone: order["phone"],
          };
        } else {
          var partneraddress4db = {
            address: order["address"],
            city: order["city"],
            zip: order["zip"],
            partnerid: partnerid,
            email: order["email"],
            phone: order["phone"],
            pib: order["code"],
            naziv_firme: order["naziv_firme"],
          };
          firma = naziv_firme;
          pib_code = order["code"];
        }
        var comm =
          "Ime i prezime: " +
          order["name"] +
          ", Grad: " +
          order["city"] +
          ", Adresa: " +
          order["address"] +
          ", Zip: " +
          order["zip"] +
          ", Email: " +
          order["email"] +
          ", PIB: " +
          order["code"] +
          ", Naziv firme: " +
          firma;

        //send mail

        allorders.map((item, index) => {
          rows += `
    <tr key={i}>
    <td style=" padding:10px;
    border-top: 0.5px solid black;">${index + 1}</td>
    <td style="padding:10px;
    border-top: 0.5px solid black;">${item.sifra}</td>
    <td style="maxWidth: 200px;padding:10px;
    border-top: 0.5px solid black;">${item.ime}</td>
    <td style="padding:10px;
    border-top: 0.5px solid black;">${item.qty}</td>
    <td style="padding:10px;
    border-top: 0.5px solid black;">${Number(item.price * 1.2).toFixed(2)}</td>
    <td style="padding:10px;
    border-top: 0.5px solid black;">20%</td>
    <td style="padding:10px;
    border-top: 0.5px solid black;">${Number(item.price).toFixed(2)}</td>
    <td style="padding:10px;
    border-top: 0.5px solid black;">${Number(0.2 * item.price).toFixed(2)}</td>
    <td style="padding:10px;
    border-top: 0.5px solid black;">${Number(item.price * 1.2).toFixed(2)}</td>
    <td style="padding:10px;
    border-top: 0.5px solid black;">${Number(
      item.qty * item.price * 1.2
    ).toFixed(2)}</td>
    <td style="padding:10px;
    border-top: 0.5px solid black;">${Number(item.price2).toFixed(2)}</td>
    <td style="padding:10px;
    border-top: 0.5px solid black;">${Number(item.price2 * item.qty).toFixed(
      2
    )}</td>
  </tr>`;
        });
        var mailOptions = {
          from: "traktorland80@hotmail.com",
          to: "marjanovicpuk@gmail.com",
          subject: "Porudžbenica Traktorland",
          text: "Porudžbenica",
          html: `
  
        <div style="width: 100%;height: 100%;
            background-color: white;
            z-index: 10000000;
            position: absolute;
            top: 0;
            left: 0;
            padding: 0 30px;">
        <div style="font-family: 'Bebas Neue', cursive;
        font-size: 29px;
        margin-left: 28px;
        margin-top: 27px;
        font-style: normal;
        font-weight: normal;
        line-height: 86%;
        cursor: pointer;
        display: inline-block;">
            <h3 style="margin: 2px;">TRAKTOR</h3>
            <h3 style="margin: 2px;">LAND.<span style="color: #F54343;">RS</span></h3> 
        </div>
        <h2 style=" font-family:Open Sans;
        margin-top: 10px;
        margin-bottom: 10px;">Porudžbenica: </h2>
        <h3>${order["name"]}</h3>
        
            <h3>${"Naziv firme: " + firma}</h3>
            <h3>${"PIB: " + pib_code}</h3>
       
        <h3 style="font-family: Open Sans;
    margin-bottom: 0px;
    margin-top: 5px;">${
      order["address"] + " " + order["city"] + " " + order["zip"]
    }</h3>
        <h3 style="font-family: Open Sans;
    margin-bottom: 0px;
    margin-top: 5px;">${"Telefon: " + order["phone"]}</h3>
        <h3 style="font-family: Open Sans;
    margin-bottom: 0px;
    margin-top: 5px;">${"E-mail: " + order["email"]}</h3>
        <h3 style="font-family: Open Sans;
    margin-bottom: 0px;
    margin-top: 5px;">${
      "Datum i vreme porudzbine : " + created + " " + time
    }</h3>
            <table style="width: 100%;
            text-align: center;">
                <thead>
                    <tr>
                        <th>R.B.</th>
                        <th>sifra</th>
                        <th>Ime</th>
                        <th>Kolicina</th>
                        <th>Cena po komadu</th>
                        <th>Stopa PDV</th>
                        <th>Poreska osnovica</th>
                        
                        <th>Iznos PDV</th>
                        <th>Cena po komadu</th>
                        <th>Cena</th>
                        <th>Cena po komadu sa Rabatom</th>
                        <th>Cena sa Rabatom</th>
                    </tr>
                </thead>
                <tbody>
                 ${rows}      

                <tr>
                    <td style="padding:10px;
                    border-top: 0.5px solid black;"></td>
                    <td style="padding:10px;
                    border-top: 0.5px solid black;"></td>
                    <td style="padding:10px;
                    border-top: 0.5px solid black;"></td>
                    <td style="padding:10px;
                    border-top: 0.5px solid black;"></td>
                    <td style="padding:10px;
                    border-top: 0.5px solid black;"></td>
                    <td style="padding:10px;
                    border-top: 0.5px solid black;"></td>
                    <td style="padding:10px;
                    border-top: 0.5px solid black;"></td>
                    <td style="padding:10px;
                    border-top: 0.5px solid black;"></td>
                    <td style="padding:10px;
                    border-top: 0.5px solid black;">Ukupno:</td>
                    <td style="padding:10px;
                    border-top: 0.5px solid black;">${Number(price).toFixed(
                      2
                    )}</td>
                    <td style="padding:10px;
                    border-top: 0.5px solid black;"></td>
                    <td style="padding:10px;
                    border-top: 0.5px solid black;">${Number(price2).toFixed(
                      2
                    )}</td>
                </tr>
                </tbody>
            </table>
            </div>`,
        };

        //res.end(JSON.stringify({ result: 'Success' }))
        //resolve();

        con.query(
          "INSERT INTO partneraddress SET ?",
          partneraddress4db,
          (err, result) => {
            if (err) throw err;
            var document4db = {
              documentdate: created2,
              valutedate: created2,
              documentissuedate: created2,
              partnerid: partnerid,
              comment: comm,
              status: "n",
              foreign_partneraddressid_web: result.insertId,
              processtype: "WEB",
              processed: "y",
              price: price,
              price2: price2,
              ime_prezime: order["name"],
            };
            con.query(
              "INSERT INTO document SET ?",
              document4db,
              (err, result) => {
                if (err) throw err;
                var insertRow = [];
                allorders.map((item) => {
                  var fullorder = [];
                  fullorder.push(result.insertId);
                  fullorder.push(item.id);
                  fullorder.push(20);
                  fullorder.push(item.qty * item.price);
                  fullorder.push(item.qty);
                  fullorder.push(Number((item.price * 100) / 120));
                  fullorder.push(Number(item.price));
                  if (userrabat == 1) {
                    fullorder.push(item.price1);
                  } else if (userrabat == 2) {
                    fullorder.push(item.price2);
                  } else if (userrabat == 3) {
                    fullorder.push(item.price3);
                  } else {
                    fullorder.push(item.price);
                  }
                  insertRow.push(fullorder);
                });

                con.query(
                  "INSERT INTO documentitem (documentid,productid,taxvalue,itemvalue,quantity,price,price1,price2) VALUES ?",
                  [insertRow],
                  (err, result) => {
                    if (err) throw err;
                    transporter.sendMail(mailOptions, (err, info) => {
                      if (err) {
                        console.log(err);
                      }
                      res.json({ result: "Success" });
                      resolve();
                    });
                  }
                );
              }
            );
          }
        );

        // con.query("INSERT INTO orders SET ?", order4db,(err,result) => {
        //   if(err) throw err;
        //   var order_id = result.insertId
        //   var insertRow = []
        //   allorders.map((item) => {
        //   var fullorder = []
        //   fullorder.push(order_id)
        //   fullorder.push(item.id)
        //   fullorder.push(item.qty)
        //   insertRow.push(fullorder)
        //   })

        //   con.query("INSERT INTO fullorder (order_id,proizvod_id,qty) VALUES ?",[insertRow],(err,result) => {
        //     if(err) throw err;

        //   })

        // })
      });
    } else {
      res.redirect("/");
      res.end();
      resolve();
    }
  });
};
