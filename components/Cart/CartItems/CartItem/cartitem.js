import { useState, useEffect } from "react";
import styles from "./cartitem.module.css";
import CartItemInfo from "../../../UI/CartItemInfo/cartItemInfo";

const cartitem = (props) => {
  const [popust, setPopust] = useState(0);

  useEffect(() => {
    if (props.isLogged) {
      switch (props.rabat) {
        case 0:
          setPopust(props.price);
          break;
        case 1:
          setPopust(props.price1);
          break;
        case 2:
          setPopust(props.price2);
          break;
        case 3:
          setPopust(props.price3);
          break;
        default:
          setPopust(0);
      }
    } else if (props.admin) {
      if (props.price != props.price2) {
        setPopust(props.price2);
      }
    } else {
      setPopust(props.price);
    }
  }, [props.price, props.isLogged, props.rabat]);

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
      {props.price != popust && props.isLogged ? (
        <p className={props.namena == "korpa" ? styles.price : styles.cprice}>
          {popust} RSD{" "}
          <span style={{ textDecoration: "line-through", color: "#F54343" }}>
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
