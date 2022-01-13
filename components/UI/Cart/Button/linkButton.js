import Link from "next/link";
import styles from "./button.module.css";

const button = (props) => {
  let addstyles = [styles.Button];
  addstyles.push(props.styles);
  return (
    <Link href={props.link}>
      <div onClick={props.click} className={addstyles.join(" ")}>
        {props.children}
      </div>
    </Link>
  );
};

export default button;
