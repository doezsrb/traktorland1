import styles from "./akcija.module.css";
import Link from "next/link";

const akcija = (props) => {
  function deleteAkcija(e) {
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    var id = e.target.getAttribute("data-id");
    var formData = new FormData();
    formData.append("id", id);
    fetch(PROTOCOL + "://" + HOST + "/api/deleteakcija", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result == "Success") {
          alert("Akcija je obrisana");
          props.refreshfunc();
        }
      });
  }
  return (
    <div className={styles.akcija}>
      <img className={styles.slika} src={props.img} alt="" />
      <h2>{props.ime}</h2>
      <h3>Sifra: #{props.sifra}</h3>
      <Link href={`/admin/akcija/edit/` + props.id}>
        <img className={styles.edit} src="/admin/edit.svg" alt="" />
      </Link>
      <img
        onClick={(e) => deleteAkcija(e)}
        data-id={props.id}
        className={styles.delete}
        src="/admin/delete.svg"
        alt=""
      />
    </div>
  );
};

export default akcija;
