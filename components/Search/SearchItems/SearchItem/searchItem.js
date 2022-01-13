import styles from "./searchItem.module.css";

const searchItem = (props) => {
  return (
    <div onClick={props.click} className={styles.searchitem}>
      <img src={props.img ? props.img : "/product.png"} alt="" />
      <h2>{props.ime}</h2>
      <h3>
        {props.cena}
        <span> RSD</span>
      </h3>
    </div>
  );
};

export default searchItem;
