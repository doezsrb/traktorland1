import styles from "./korisnik.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
const korisnik = (props) => {
  const [rabat, setRabat] = useState(props.rabat);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  useEffect(() => {
    var vreme = props.datum;
    var t = vreme.split(/[- T : Z]/);
    var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5]));
    setDate(t[1] + "/" + t[2] + "/" + t[0]);
    setTime(t[3] + ":" + t[4]);
  }, []);

  function onChange(e) {
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    setRabat(e.target.value);

    var formData = new FormData();
    formData.append("id", e.target.name);
    formData.append("rabat", e.target.value);
    fetch(PROTOCOL + "://" + HOST + "/api/changerabat", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result == "Success") {
        }
      });
  }
  function deleteUser(e) {
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    var id = e.target.name;
    var formData = new FormData();
    formData.append("id", id);
    fetch(PROTOCOL + "://" + HOST + "/api/deleteuser", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result == "Success") {
          props.deletefunc();
          alert("Korisnik je obrisan");
        }
      });
  }
  return (
    <div className={styles.korisnik}>
      <div className={styles.datum}>Datum kreiranja: {date}</div>
      <div className={styles.ime}>{props.ime}</div>
      <div className={styles.adresa}>{props.adresa}</div>
      <div className={styles.rabat}>
        <div className={styles.box}>
          <select onChange={(e) => onChange(e)} value={rabat} name={props.id}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <h3 className={styles.proc}>Rabat</h3>
      </div>
      {/* <Link href="/admin/korisnici/edit"><img className={styles.edit} src="/admin/edit.png" alt=""/></Link> */}
      <img
        onClick={(e) => deleteUser(e)}
        name={props.id}
        className={styles.delete}
        src="/admin/delete.svg"
        alt=""
      />
    </div>
  );
};

export default korisnik;
