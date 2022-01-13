import styles from "./wrapper.module.css";
import useCart from "../../.././../util/useCart";

const wrapper = () => {
  const { isCartOpened, toggleCart } = useCart();
  return (
    <div
      onClick={toggleCart}
      className={isCartOpened ? styles.wrapper : styles.nema}
    ></div>
  );
};

export default wrapper;
