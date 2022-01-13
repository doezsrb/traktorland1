import { useState, useEffect } from "react";
import styles from "./cartitems.module.css";
import CartItem from "./CartItem/cartitem";
import useCart from "../../../util/useCart";
import LinkButton from "../../UI/Button/LinkButton/linkButton";

const cartitems = (props) => {
  const {
    price,
    price1,
    price2,
    price3,
    toggleCart,
    items,
    removeFromCart,
    addOne,
    removeOne,
    isLogged,
    user,
  } = useCart();

  const [priceCart, setPriceCart] = useState(price);
  useEffect(() => {
    if (isLogged) {
      switch (user.rabat) {
        case 0:
          setPriceCart(price);
          break;
        case 1:
          setPriceCart(price1);
          break;
        case 2:
          setPriceCart(price2);
          break;
        case 3:
          setPriceCart(price3);
          break;
        default:
          setPriceCart(0);
      }
    } else {
      setPriceCart(price);
    }
  }, [price, isLogged]);
  let cartitems = items.map((cartitem) => {
    const item = {
      id: cartitem.id,
      ime: cartitem.name,
      slika: cartitem.src,
      price: Number(cartitem.price).toFixed(2),
      price1: Number(cartitem.price1).toFixed(2),
      price2: Number(cartitem.price2).toFixed(2),
      price3: Number(cartitem.price3).toFixed(2),
      qty: cartitem.qty,
      sifra: cartitem.sifra,
    };
    return (
      <CartItem
        isLogged={isLogged}
        edit={true}
        sifra={cartitem.sifra}
        namena={props.namena}
        key={cartitem.id}
        src={cartitem.slika}
        name={cartitem.ime}
        price={cartitem.price}
        price1={cartitem.price1}
        price2={cartitem.price2}
        price3={cartitem.price3}
        rabat={user.rabat}
        qty={cartitem.qty}
        up={() => addOne(item)}
        down={() => removeOne(item)}
        brisi={() => removeFromCart(item)}
      ></CartItem>
    );
  });

  let korpa = (
    <div className={styles.cartitems}>
      <h3 className={styles.ime}>KORPA</h3>
      <img
        onClick={toggleCart}
        className={styles.X}
        src="/header/x.svg"
        alt=""
      />
      <div className={styles.gornjideo}>{cartitems}</div>
      <div className={styles.donjideo}>
        <p>
          UKUPNO: <span>{Number(priceCart).toFixed(0)}</span>
          <span> RSD</span>
        </p>
        <LinkButton click={toggleCart} link="/checkout" styles={styles.Button}>
          Završi kupovinu
        </LinkButton>
      </div>
    </div>
  );
  let checkout = <div className={styles.cartitemscheckout}>{cartitems}</div>;

  return <>{props.namena == "korpa" ? korpa : checkout}</>;
};

export default cartitems;
