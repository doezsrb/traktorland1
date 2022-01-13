import styles from "./form.module.css";

const form = (props) => {
  return (
    <div className={styles.form}>
      <h2>{props.formname}</h2>
      {props.children}
    </div>
  );
};

export default form;
