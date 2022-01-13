import Link from "next/link";
import styles from "./Navitem.module.css";

const navitem = (props) => {
  return (
    <Link href={props.link}>
      <a className={styles.Navitem}>{props.children}</a>
    </Link>
  );
};

export default navitem;
