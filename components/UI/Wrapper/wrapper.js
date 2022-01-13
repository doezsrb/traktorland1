import styles from "./wrapper.module.css";
import useCart from "../../../util/useCart";

const wrapper = (props) => {
  return (
    <div
      style={props.style ? { top: props.style } : null}
      onClick={props.click}
      className={props.isOpened ? styles.wrapper : styles.nema}
    ></div>
  );
};

export default wrapper;
