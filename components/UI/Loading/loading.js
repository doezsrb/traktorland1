import styles from "./loading.module.css";
const loading = (props) => {
  return (
    <div className={styles.loading}>
      <h3>{props.message}</h3>
      <div className={styles.lds_roller}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default loading;
