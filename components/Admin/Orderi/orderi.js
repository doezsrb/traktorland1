import styles from "./orderi.module.css";
import Order from "./Order/order";

const orderi = ({ orders }) => {
  return (
    <div className={styles.orderi}>
      {orders
        .slice(0)
        .reverse()
        .map((item) => (
          <Order
            key={item.documentid}
            ime={item.ime_prezime}
            prezime=""
            created={item.documentts}
            vreme=""
            adresa=""
            grad=""
            pak=""
            addressid={item.foreign_partneraddressid_web}
            id={item.documentid}
            cena={item.price2}
            orderid={`#` + item.documentid}
          />
        ))}
    </div>
  );
};

export default orderi;
