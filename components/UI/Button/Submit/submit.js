import styles from "./submit.module.css";

const submit = (props) => {
  let addstyles = [styles.Button];
  {
    props.styles ? addstyles.push(props.styles) : null;
  }
  return (
    <button onClick={props.submit} className={addstyles.join(" ")}>
      {props.children}
    </button>
  );
};

export default submit;
