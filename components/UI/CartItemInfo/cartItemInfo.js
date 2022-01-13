import { useState, useEffect } from "react";
import styles from "./cartItemInfo.module.css";

const cartItemInfo = (props) => {
  const [edit, setEdit] = useState(true);

  useEffect(() => {
    {
      props.edit ? setEdit(true) : setEdit(false);
    }
  }, []);

  return (
    <div
      className={
        props.namena == "korpa" ? styles.cartItemInfo : styles.checkoutItemInfo
      }
    >
      {edit ? (
        <>
          <img
            className={styles.brisi}
            onClick={props.brisi}
            src="/header/x.svg"
            alt=""
          />
          <p className={styles.kolicina}>x{props.qty}</p>
          <img
            className={styles.up}
            onClick={props.up}
            src="/cart/up.svg"
            alt=""
          />
          <img
            className={styles.down}
            onClick={props.down}
            src="/cart/down.svg"
            alt=""
          />
          {props.namena == "korpa" ? null : (
            <p className={styles.sifra}>Sifra: #{props.sifra}</p>
          )}
        </>
      ) : (
        <>
          <p className={styles.kolicina}>x{props.qty}</p>
          <p className={styles.sifra}>Sifra: {props.sifra}</p>
        </>
      )}
    </div>
  );
};

export default cartItemInfo;
