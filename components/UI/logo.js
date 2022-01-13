import styles from "../../styles/Logo.module.css";
const logo = () => {
  return (
    <div className={styles.logo}>
      <h3 className={styles.p}>TRAKTOR</h3>
      <h3 className={styles.p}>
        LAND.<span className={styles.span}>RS</span>
      </h3>
    </div>
  );
};

export default logo;
