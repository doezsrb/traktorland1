import { useState, useEffect } from "react";
import styles from "../../styles/checkout.module.css";
// import CartItems from '../../components/Cart/CartItems/cartitems';
// import Total from '../../components/UI/Checkout/total';
import useCart from "../../util/useCart";
import FinishOrder from "../../components/UI/FinishOrder/PopUp/popUp";
import { useRouter } from "next/router";
import TotalNoSSR from "../../components/UI/Checkout/total";
import CartItemsNoSSR from "../../components/Cart/CartItems/cartitems";

export default function Checkout() {
  const { price, price1, price2, price3, items, isLogged, user, shipping } =
    useCart();
  const [showPopUp, setShowPopUp] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (items.length < 1) {
      setTimeout(() => {
        router.push("/webshop");
      }, 3000);
    }
  }, [items]);

  const popUpHandler = () => {
    if (isLogged) {
      if (JSON.stringify(shipping) != "{}") {
        // SREDITI OVAJ DEO
        router.push("/checkout/order");
      } else {
        router.push("/checkout/orderdetails");
      }
      return;
    }
    setShowPopUp(!showPopUp);
  };

  // const praznakorpa = <div className={styles.praznaKorpa}>
  //   <h3>Vasa korpa je prazna</h3>
  //   <LinkButton link="/webshop">Nazad na kupovinu</LinkButton>
  // </div>;

  const punakorpa = (
    <>
      <CartItemsNoSSR namena="checkout" />
      <div className={styles.total}>
        <TotalNoSSR
          isLogged={isLogged}
          edit={true}
          klik={() => popUpHandler()}
          price={price}
          price1={price1}
          price2={price2}
          price3={price3}
          rabat={user.rabat == undefined ? "0" : user.rabat}
        />
      </div>
      <FinishOrder show={showPopUp} off={() => popUpHandler()} />
    </>
  );
  return (
    <div className={styles.body}>
      <h1 className={styles.naslov}>Moja Korpa</h1>
      {items.length < 1 ? (
        <h1 className={styles.naslov}>
          Vaša korpa je prazna - bićete prebačeni na drugu stranicu
        </h1>
      ) : null}
      <div className={styles.line}></div>

      {punakorpa}
    </div>
  );
}
