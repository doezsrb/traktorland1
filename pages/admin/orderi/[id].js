import { useRouter } from "next/router";

import OrderAdmin from "../../../components/Order/orderAdmin";
import styles from "../../../styles/checkout.module.css";
import qs from "querystring";
import Cookies from "cookies";
import Footer from "../../../components/Footer/footer";
import Print from "../../../components/UI/Print/print";

export async function getServerSideProps({ req, res, query }) {
  var HOST = process.env.HOST;
  var PROTOCOL = process.env.PROTOCOL;
  var user = "";
  var email = "";
  var cookies = new Cookies(req, res);
  var authToken = cookies.get("auth-token");
  if (authToken == undefined) {
    res.writeHead(307, { Location: "/login" });
    res.end();
  }
  await fetch(PROTOCOL + "://" + HOST + "/api/checkauth", {
    headers: { "auth-token": authToken },
  })
    .then((res) => res.json())
    .then((data) => {
      email = data.email;
    });

  await fetch(PROTOCOL + "://" + HOST + "/api/getuser", {
    method: "POST",
    body: JSON.stringify({ email: email }),
  })
    .then((res) => res.json())
    .then((data) => {
      user = data.user;
    });
  if (user.partnertype !== "admin") {
    res.writeHead(307, { Location: "/login" });
    res.end();
  }

  //----------------------------------------------------

  var id = query.id;
  var data = await fetch(PROTOCOL + "://" + HOST + "/api/getorders?id=" + id)
    .then((res) => res.json())
    .then((data) => data);
  var orders = await fetch(
    PROTOCOL + "://" + HOST + "/api/getorders?order_id=" + id
  )
    .then((res) => res.json())
    .then((data) => data);
  console.log("ORDERS");
  console.log(orders);
  var orderaddress = await fetch(
    PROTOCOL +
      "://" +
      HOST +
      "/api/getorderaddress?id=" +
      data[0].foreign_partneraddressid_web
  )
    .then((res) => res.json())
    .then((data) => data);

  var orderuser = await fetch(
    PROTOCOL + "://" + HOST + "/api/getuser?id=" + orderaddress[0].partnerid
  )
    .then((res) => res.json())
    .then((data) => data);

  if (user.length > 0) {
    data[0]["rabat"] = orderuser.user[0].rabat;
  } else {
    data[0]["rabat"] = 0;
  }

  return {
    props: {
      data: data[0],
      orders: orders,
      orderaddress: orderaddress[0],
    },
  };
}
const ViewOrder = ({ data, orders, orderaddress }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.body} style={{ paddingTop: "10px" }}>
          <h1 className={styles.naslov}>Pregled porudzbine</h1>
          <h2 className={styles.back} onClick={() => router.back()}>
            {"<"} ADMIN
          </h2>
          <button className={styles.printbutton} onClick={() => window.print()}>
            Print
          </button>

          <div className={styles.line}></div>
          <OrderAdmin
            namena="order"
            adminpanel
            orderaddress={orderaddress}
            orders={orders}
            data={data}
            edit={false}
          />
        </div>
        <Footer />
      </div>
      <div className={styles.print}>
        <Print orders={orders} data={data} orderaddress={orderaddress} />
      </div>
    </>
  );
};

export default ViewOrder;
