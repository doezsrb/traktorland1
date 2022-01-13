import React from "react";
import styles from "./filter.module.css";

const filter = (props) => {
  let style = [styles.filtersearch];
  {
    props.styles ? style.push(props.styles) : null;
  }
  return (
    <input
      className={style.join(" ")}
      type="text"
      onChange={props.change}
      placeholder={props.placeholder}
    />
  );
};

export default filter;
