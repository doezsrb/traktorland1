import { useState, useEffect } from "react";
import styles from "./cartitem.module.css";
import CartItemInfo from "../../../UI/CartItemInfo/cartItemInfo";

const cartitem = (props) => {
  return (
    <div
      className={
        props.namena == "korpa" ? styles.cartitem : styles.checkoutitem
      }
    >
      <img
        className={props.namena == "korpa" ? styles.img : styles.cimg}
        src={props.src ? props.src : "/product.png"}
        alt=""
      />
      <p className={props.namena == "korpa" ? styles.name : styles.cname}>
        {props.name}
      </p>
      {props.price != props.price2 ? (
        <p className={props.namena == "korpa" ? styles.price : styles.cprice}>
          {props.price2} RSD{" "}
          <span style={{ textDecoration: "line-through", color: "red" }}>
            {props.price}
          </span>
        </p>
      ) : (
        <p className={props.namena == "korpa" ? styles.price : styles.cprice}>
          {props.price} RSD
        </p>
      )}
      <CartItemInfo
        namena={props.namena}
        edit={props.edit}
        sifra={props.sifra}
        brisi={props.brisi}
        qty={props.qty}
        up={props.up}
        down={props.down}
      />
    </div>
  );
};

export default cartitem;
