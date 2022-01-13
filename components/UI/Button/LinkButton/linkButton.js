import Link from "next/link";
import styles from "./button.module.css";

const button = (props) => {
  let addstyles = [styles.Button];
  addstyles.push(props.styles);
  var url = props.link;
  if (url.includes("login") || url.includes("register")) {
    url += "?back=checkout";
  }
  return (
    <Link href={url}>
      <div onClick={props.click} className={addstyles.join(" ")}>
        {props.children}
      </div>
    </Link>
  );
};

export default button;
