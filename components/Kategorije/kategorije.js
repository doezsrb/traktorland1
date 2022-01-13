import Aux from "../../hoc/Auxiliary/Auxiliary";
import Kategorija from "./kategorija/kategorija";
import styles from "./kategorije.module.css";
import Link from "next/link";

const kategorije = () => {
  return (
    <Aux>
      {/* <h3 className={styles.naslov}>KATEGORIJE</h3> */}
      <div className={styles.kategorije}>
        <Kategorija
          top2="19"
          top="20"
          src="kategorije/traktori.svg"
          link="/webshop/traktori?page=1"
        >
          Traktori
        </Kategorija>
        <Kategorija
          top2="22.48"
          top="24"
          src="kategorije/beraci.svg"
          link="/webshop/beraci?page=1"
        >
          Berači
        </Kategorija>
        <Kategorija
          top2="22"
          top="21"
          src="kategorije/kombajni.svg"
          link="/webshop/kombajni?page=1"
        >
          Kombajni
        </Kategorija>
        <Kategorija
          top2="22.72"
          top="25.72"
          src="kategorije/freze.svg"
          link="/webshop/freze?page=1"
        >
          Freze
        </Kategorija>
        <Kategorija
          top2="8"
          top="8"
          sir="300"
          src="kategorije/poljmasine.svg"
          link="/webshop/delovi?page=1"
        >
          Delovi Za <br></br>Poljoprivredne Mašine
        </Kategorija>
        <Kategorija
          top2="14"
          top="14"
          sir="300"
          src="kategorije/poljmeh.svg"
          link="/webshop/mehanizacija?page=1"
        >
          Poljoprivredna Mehanizacija
        </Kategorija>
        <Kategorija
          top2="42"
          top="44"
          src="kategorije/ostalo.svg"
          link="/webshop/ostalo?page=1"
        >
          Ostalo
        </Kategorija>
      </div>
    </Aux>
  );
};

export default kategorije;
