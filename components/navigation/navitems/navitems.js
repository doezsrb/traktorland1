import Navitem from "../navitems/navitem/navitem";
import Aux from "../../../hoc/Auxiliary/Auxiliary";
import styles from "./Navitems.module.css";

const navitems = () => {
  return (
    <Aux>
      <div className={styles.Navitems}>
        <Navitem link="/">Pocetna</Navitem>
        <Navitem link="/kontakt">Kontakt</Navitem>
        <Navitem link="/webshop">Web Shop</Navitem>
      </div>
    </Aux>
  );
};

export default navitems;
