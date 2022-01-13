import Aux from "../../../hoc/Auxiliary/Auxiliary";
import styles from "./contactinfo.module.css";

const coninfo = () => {
  return (
    <Aux>
      <div className={styles.coninfo}>
        <img className={styles.phoneimg} src="/call.svg" alt="" />
        <img className={styles.mailimg} src="/mail.svg" alt="" />
        <div className={styles.line}></div>
        <h3 className={styles.phone}>
          <a href="tel:+38162692827">+381/62 692 827</a>
        </h3>
        <h3 className={styles.mail}>
          <a href="mailto:marjanovicpuk@gmail.com">marjanovicpuk@gmail.com</a>
        </h3>
      </div>
    </Aux>
  );
};

export default coninfo;
