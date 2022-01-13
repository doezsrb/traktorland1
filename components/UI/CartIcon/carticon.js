import useCart from "../../../util/useCart";
import styles from "./carticon.module.css";
import dynamic from "next/dynamic";
import CountNoSSR from "./CartCount/count";

const carticon = (props) => {
  const { toggleCart, items } = useCart();

  // const CountNoSSR = dynamic(
  //     () => import('./CartCount/count'),
  //     { ssr: false }
  //   );

  return (
    <div className={styles.carticon}>
      <CountNoSSR
        items={items}
        styles_prikazi={styles.prikazi}
        styles_nema={styles.nema}
      ></CountNoSSR>
      {/* <p className={items.length != null && items.length > 0 ? styles.prikazi : styles.nema}>{items.length}</p> */}
      <img
        onClick={props.open ? null : toggleCart}
        src="/header/cart.svg"
        alt=""
      />
    </div>
  );
};

export default carticon;
