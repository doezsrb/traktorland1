import styles from "./kartica.module.css";
import Link from "next/link";

const kartica = (props) => {
  return (
    <div className={styles.kartica}>
      <img
        style={{
          top: props.top + "px",
          width: props.wid + "px",
          height: props.hei + "px",
          left: props.lef + "px",
        }}
        className={styles.slika}
        src={props.src}
        alt=""
      />
      <div className={styles.inlineb}>
        <h2 className={styles.ime}>{props.children}</h2>
        <h3 className={styles.natpis}>{props.natpis}</h3>
      </div>
    </div>
  );
};

export default kartica;
