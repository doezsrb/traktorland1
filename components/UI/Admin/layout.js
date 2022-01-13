import styles from "./layout.module.css";
import Logo from "../Logo/logo";
import Link from "next/link";
const layout = () => {
  return (
    <div className={styles.adminLayout}>
      <Logo />
      <Link href="/admin/orderi">
        <div className={styles.linkovi}>Orderi</div>
      </Link>
      <Link href="/admin/proizvodi">
        <div className={styles.linkovi}>Proizvodi</div>
      </Link>
      <Link href="/admin/korisnici">
        <div className={styles.linkovi}>Korisnici</div>
      </Link>
      <Link href="/admin/akcija">
        <div className={styles.linkovi}>Akcija</div>
      </Link>
    </div>
  );
};

export default layout;
