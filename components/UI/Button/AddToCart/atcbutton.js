import { useEffect } from "react";
import styles from "./atcbutton.module.css";
import useCart from "../../../../util/useCart";

const atcbutton = (props) => {
  const { addToCart } = useCart();
  let classes = [styles.Button];

  if (props.styles) {
    classes.push(props.styles);
  }
  if (props.disable) {
    classes.push(styles.disable);
  }
  return (
    <button
      onClick={
        !props.disable
          ? () => {
              var user = props.user;
              var item = props.item;
              var popust = 0;
              if (user.partnerid != undefined) {
                if (user.rabat == 1) {
                  popust = item.rabat_1;
                } else if (user.rabat == 2) {
                  popust = item.rabat_2;
                } else {
                  popust = item.rabat_3;
                }
              }
              var objToCart = { ...props.item };
              objToCart["price"] = Number(item.price).toFixed(2);
              objToCart["price1"] = (
                item.price *
                (1 - item.rabat_1 / 100)
              ).toFixed(2);
              objToCart["price2"] = (
                item.price *
                (1 - item.rabat_2 / 100)
              ).toFixed(2);
              objToCart["price3"] = (
                item.price *
                (1 - item.rabat_3 / 100)
              ).toFixed(2);
              addToCart(objToCart);
            }
          : null
      }
      className={classes.join(" ")}
    >
      + Dodaj u Korpu
    </button>
  );
};
export default atcbutton;
