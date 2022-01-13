import { useEffect } from "react";
import styles from "./atcbutton.module.css";
import useCart from "../../../../util/useCart";

const atcbutton = (props) => {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => addToCart({ ...props.item })}
      className={styles.Button}
    >
      + Dodaj u Korpu
    </button>
  );
};
export default atcbutton;
