import styles from "./akcije.module.css";
import Akcija from "./Akcija/akcija";
import Link from "next/link";
const akcije = ({ akcije, refreshfunc }) => {
  return (
    <div className={styles.akcije}>
      {akcije.map((akcija) => (
        <Link key={akcija.id} href={akcija.link_proizvoda}>
          <Akcija
            refreshfunc={refreshfunc}
            id={akcija.id}
            img={akcija.thumb}
            ime={akcija.ime}
            sifra={akcija.sifra}
          />
        </Link>
      ))}
    </div>
  );
};

export default akcije;
