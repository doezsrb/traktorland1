import styles from "../../../../styles/Search.module.css";
import Aux from "../../../../hoc/Auxiliary/Auxiliary";

const search = () => {
  return (
    <Aux>
      <div className={styles.Search}>
        <div className={styles.lupica}>
          <img src="/search.png" alt="" />
        </div>
        <input
          className={styles.input}
          type="text"
          placeholder="Pretrazite..."
        />
      </div>
    </Aux>
  );
};

export default search;
