import { useState } from "react";
import styles from "./hamburger.module.css";

const hamburger = (props) => {
  return (
    <div
      onClick={props.onclickhandler}
      id={styles.navicon3}
      className={props.open ? styles.open : null}
    >
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default hamburger;
