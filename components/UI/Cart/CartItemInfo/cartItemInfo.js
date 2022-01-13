import styles from "./cartItemInfo.module.css";

const cartItemInfo = (props) => {
  return (
    <div className={styles.cartItemInfo}>
      <img
        className={styles.brisi}
        onClick={props.brisi}
        src="/header/x.png"
        alt=""
      />
      <p className={styles.kolicina}>x{props.qty}</p>
      <img className={styles.up} onClick={props.up} src="/cart/up.png" alt="" />
      <img
        className={styles.down}
        onClick={props.down}
        src="/cart/down.png"
        alt=""
      />
    </div>
  );
};

export default cartItemInfo;
