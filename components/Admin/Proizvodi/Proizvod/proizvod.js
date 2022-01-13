import styles from "./proizvod.module.css";
import Link from "next/link";

const proizvod = (props) => {
  function deleteProizvod(e) {
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    var id = e.target.name;
    var formData = new FormData();
    formData.append("id", id);
    fetch(PROTOCOL + "://" + HOST + "/api/deleteproizvod", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result == "Success") {
          props.refresh();
          alert("Proizvod je obrisan");
        }
      });
  }
  return (
    <div className={styles.proizvod}>
      <p className={styles.sifra}>
        Sifra: <span>{props.sifra}</span>
      </p>
      <img
        className={styles.img}
        src={props.src ? props.src : "/product.png"}
        alt=""
      />
      <p className={styles.name}>{props.name}</p>
      <p className={styles.price}>
        {Number(props.price * 1.2).toFixed(2)} RSD{" "}
        <span className={styles.rabat}>
          Rabat: {props.rabat_1 + " " + props.rabat_2 + " " + props.rabat_3}
        </span>
      </p>
      {/* <p className={styles.kolicina}>{props.kolicina}</p> */}
      <Link href={props.url}>
        <img className={styles.edit} src="/admin/edit.svg" alt="" />
      </Link>
      <img
        onClick={(e) => deleteProizvod(e)}
        name={props.id}
        className={styles.delete}
        src="/admin/delete.svg"
        alt=""
      />
    </div>
  );
};

export default proizvod;
