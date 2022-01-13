import styles from "../../styles/webshop.module.css";
import Kategorije from "../../components/Kategorije/kategorije";
import Kartice from "../../components/Kartice/kartice";
import { useEffect } from "react";
export default function Webshop(props) {
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <h1 className={styles.naslov}>WEBSHOP</h1>
        <div className={styles.line}></div>
        <h3 className={styles.naslov2}>KATEGORIJE</h3>
        <Kategorije />
        <Kartice />
      </div>
    </div>
  );
}
