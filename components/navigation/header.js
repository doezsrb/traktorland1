import Logo from "../UI/logo";
import styles from "../../styles/Header.module.css";
import Search from "../navigation/navitems/search/search";
import Navitems from "../navigation/navitems/navitems";
import Dropdown from "./navitems/dropdown/dropdown";
import CartIcon from "../UI/Cart/CartIcon/carticon";

const header = () => {
  return (
    <header className={styles.header}>
      <Logo />
      <Search />
      <Navitems />
      {/* <Dropdown/> */}
      <CartIcon />
    </header>
  );
};

export default header;
