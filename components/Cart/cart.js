import styles from "./cart.module.css";
import useCart from "../../util/useCart";
import LinkButton from "../UI/Button/LinkButton/linkButton";
import CartItems from "./CartItems/cartitems";

const cart = () => {
  const { isCartOpened, items, toggleCart } = useCart();

  const prazno = (
    <>
      <img
        onClick={toggleCart}
        className={styles.X}
        src="/header/x.svg"
        alt=""
      />
      <p className={styles.praznakorpa}>Vaša korpa je prazna</p>
      <LinkButton click={toggleCart} styles={styles.LinkButton} link="/webshop">
        Nazad na kupovinu
      </LinkButton>
    </>
  );
  return (
    <div className={isCartOpened ? styles.CartOpen : styles.CartClosed}>
      {items.length != null && items.length > 0 ? (
        <CartItems namena="korpa" />
      ) : (
        prazno
      )}
    </div>
  );
};

export default cart;
