import styles from "./kategorija.module.css";
import Link from "next/link";

const kategorija = (props) => {
  return (
    <Link href={props.link}>
      <div
        style={{
          width: props.sir != undefined ? props.sir + "px" : 150 + "px",
        }}
        className={styles.kategorija}
      >
        <img
          style={{ marginTop: props.top + "px" }}
          className={styles.slika}
          src={props.src}
          alt=""
        />
        <h2 style={{ marginTop: props.top2 + "px" }} className={styles.ime}>
          {props.children}
        </h2>
      </div>
    </Link>
  );
};

export default kategorija;
