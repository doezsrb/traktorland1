import styles from "./dropHeader.module.css";
import Link from "next/link";

const dropHeader = (props) => {
  return (
    <div className={styles.dropHeader}>
      <ul>
        <Link href="/">
          <li onClick={props.setopen}>Pocetna</li>
        </Link>
        <Link href="/kontakt">
          <li onClick={props.setopen}>Kontakt</li>
        </Link>
        <Link href="/webshop">
          <li onClick={props.setopen}>Webshop</li>
        </Link>
      </ul>
    </div>
  );
};

export default dropHeader;
