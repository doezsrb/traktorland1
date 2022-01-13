import styles from "./style.module.css";

const conBlockInfo = () => {
  return (
    <div className={styles.div}>
      <div className={styles.block}>
        <div className={styles.naslov}>Radno Vreme</div>
        <div className={styles.text}>08:00 - 16:00</div>
      </div>
      <div className={styles.block}>
        <div className={styles.naslov}>Email</div>
        <div className={styles.text}>
          <a href="mailto:marjanovicpuk@gmail.com">marjanovicpuk@gmail.com</a>
          <br></br>
          <a href="mailto:traktorland1@gmail.com">traktorland1@gmail.com</a>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.naslov}>Adresa</div>
        <div className={styles.text}>
          <a
            href="https://www.google.rs/maps/place/T.R.Marjanovic/@43.1681219,21.8505713,17z/data=!3m1!4b1!4m5!3m4!1s0x4755bd592dfc7da3:0xfc5a1b56d0e6e1c6!8m2!3d43.168118!4d21.85276"
            target="blank"
          >
            Knez Mihajlova 67,<br></br>18255 Pukovac
          </a>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.naslov}>Telefon</div>
        <div className={styles.text}>
          <a href="tel:+38118812100">+381(18) 812 100</a>
          <br></br>
          <a href="tel:+38163412447">+381(63) 412 447</a>
        </div>
      </div>
    </div>
  );
};

export default conBlockInfo;
