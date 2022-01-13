import { useState, useEffect } from "react";
import styles from "./total.module.css";
import Submit from "../Button/Submit/submit";
import useCart from "../../../util/useCart";

const total = (props) => {
  const classes = [styles.total];
  return (
    <div className={classes.join(" ")} style={{ height: "230px" }}>
      <h2 className={styles.heading}>Totalni obračun</h2>
      <div>
        <h3 className={styles.proizvodii}>Proizvodi</h3>
        <h2 className={styles.price}>{props.price} RSD</h2>
      </div>

      <div>
        <h3 className={styles.rabatt}>Popust</h3>
        {props.price == props.price2 ? (
          <h2 className={styles.rabat}>0 RSD</h2>
        ) : (
          <h2 className={styles.rabat}>{props.price - props.price2} RSD</h2>
        )}
      </div>

      <div className={styles.line}></div>
      <h3 className={styles.ukupno}>UKUPNO</h3>
      {props.price == props.price2 ? (
        <h3 className={styles.ukupnocena}>
          {Number(props.price).toFixed(0)} RSD
        </h3>
      ) : (
        <h3 className={styles.ukupnocena}>
          {Number(props.price2).toFixed(0)} RSD
        </h3>
      )}
    </div>
  );
};

export default total;
