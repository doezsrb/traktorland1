import Aux from "../../hoc/Auxiliary/Auxiliary";
import Kartica from "./kartica/kartica";
import styles from "./kartice.module.css";
import Link from "next/link";

const kartice = () => {
  return (
    <Aux>
      {/* <h3 className={styles.naslov}>Neke od nasih usluga</h3> */}
      <div className={styles.line}></div>
      <div className={styles.kartice}>
        <Kartica
          wid="90"
          hei="50"
          lef="15"
          top="31.5"
          natpis="Na teritoriji cele srbije"
          src="/kartice/truck.svg"
          link="/webshop/traktori"
        >
          BRZA ISPORUKA
        </Kartica>
        <Kartica
          wid="57"
          hei="65"
          lef="35"
          top="24"
          natpis="Kontaktirajte nas"
          src="/kartice/man.svg"
          link="/webshop/beraci"
        >
          POMOĆ PRI KUPOVINI
        </Kartica>
        <Kartica
          wid="66"
          hei="55"
          lef="25"
          top="29"
          natpis="Na sajtu ili putem telefona"
          src="/kartice/cart.svg"
          link="/webshop/kombajni"
        >
          ONLINE NARUČIVANJE
        </Kartica>
      </div>
    </Aux>
  );
};

export default kartice;
