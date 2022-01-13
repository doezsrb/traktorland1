import { useEffect, useState } from "react";
import styles from "./order.module.css";
import Link from "next/link";
const order = (props) => {
  const [adresa, setAdresa] = useState();
  const [grad, setGrad] = useState();
  const [zip, setZip] = useState();
  const [cena, setCena] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  useEffect(() => {
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    fetch(
      PROTOCOL + "://" + HOST + "/api/getorderaddress?id=" + props.addressid
    )
      .then((res) => res.json())
      .then((data) => {
        setAdresa(data[0].address);
        setGrad(data[0].city);
        setZip(data[0].zip);
        var vreme = props.created;
        var t = vreme.split(/[- T : Z]/);
        var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
        setDate(t[2] + "/" + t[1] + "/" + t[0]);
        setTime(t[3] + ":" + t[4]);
      });
  }, []);
  return (
    <div className={styles.order}>
      <div className={styles.id}>ORDER ID: {props.orderid} </div>
      <div className={styles.ime}>
        <h2>{props.ime}</h2>
        <h3>{adresa}</h3>
        <h3>{grad + " " + zip}</h3>
      </div>
      <div className={styles.kolicina}>
        <h3>{date}</h3>
        <h3>{time}</h3>
      </div>
      <div className={styles.cena}>
        <h3> {"Cena: " + props.cena}</h3>
      </div>
      <Link href={`/admin/orderi/` + props.id}>
        <div className={styles.dugme}>
          <button>{">"}</button>
        </div>
      </Link>
    </div>
  );
};

export default order;
