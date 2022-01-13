import styles from "./itemWrapper.module.css";
import useCart from "../../../util/useCart";

const itemwrapper = () => {
  const { isItemOpened, toggleItem } = useCart();
  return (
    <div
      onClick={toggleItem}
      className={isItemOpened ? styles.wrapper : styles.nema}
    ></div>
  );
};

export default itemwrapper;
