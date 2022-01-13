import styles from "./input.module.css";

const input = (props) => {
  let inputElement = null;
  switch (props.inputtype) {
    case "input":
      inputElement = <input className={styles.input} {...props} />;
      break;
    case "textarea":
      inputElement = <textarea className={styles.textarea} {...props} />;
      break;
    case "select":
      inputElement = (
        <select className={styles.input} {...props}>
          {props.children}
        </select>
      );
      break;
    default:
      inputElement = <input className={styles.Input} {...props} />;
  }
  return (
    <div className={styles.inputdiv}>
      <label className={styles.label}>
        {props.img ? (
          <img className={styles.labelimg} src={props.img} alt="" />
        ) : null}
        {props.label}
      </label>
      {inputElement}
    </div>
  );
};

export default input;
