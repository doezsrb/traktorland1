import { useState, useEffect } from "react";
import styles from "./total.module.css";
import Submit from "../Button/Submit/submit";
import useCart from "../../../util/useCart";

const total = (props) => {
  const [popust, setPopust] = useState(0);
  const { price, price1, price2, price3, items, isLogged } = useCart();
  const classes = [styles.total];

  useEffect(() => {
    // {props.isLogged ? setPopust(props.price2) : setPopust(0)}
    if (props.isLogged) {
      switch (props.rabat) {
        case "0":
          setPopust(0);
          break;
        case 1:
          setPopust(price - price1);
          break;
        case 2:
          setPopust(price - price2);
          break;
        case 3:
          setPopust(price - price3);
          break;
        default:
          setPopust(0);
      }
    }
  }, [props.isLogged, price, props.rabat]);

  return (
    <div
      className={classes.join(" ")}
      style={!props.edit ? { height: "230px" } : null}
    >
      <h2 className={styles.heading}>Totalni obračun</h2>
      <div>
        <h3 className={styles.proizvodii}>Proizvodi</h3>
        <h2 className={styles.price}>{price} RSD</h2>
      </div>

      <div>
        <h3 className={styles.rabatt}>Popust</h3>
        {!props.isLogged ? (
          <h2 className={styles.rabat}>0 RSD</h2>
        ) : (
          <h2 className={styles.rabat}>{Number(popust).toFixed(2)} RSD</h2>
        )}
      </div>

      <div className={styles.line}></div>
      <h3 className={styles.ukupno}>UKUPNO</h3>
      {!props.isLogged ? (
        <h3 className={styles.ukupnocena}>
          {Number(props.price).toFixed(2)} RSD
        </h3>
      ) : (
        <h3 className={styles.ukupnocena}>
          {Number(price - popust).toFixed(2)} RSD
        </h3>
      )}
      {props.edit ? (
        <Submit submit={props.klik} styles={styles.button}>
          Završi porudžbinu
        </Submit>
      ) : null}
    </div>
  );
};

export default total;
