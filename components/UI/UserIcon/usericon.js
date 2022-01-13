import { useState, useEffect } from "react";
import styles from "./usericon.module.css";
import Link from "next/link";
import useCart from "../../../util/useCart";

const UserIcon = (props) => {
  const [url, setUrl] = useState("");
  const { isLogged } = useCart();
  let style = [styles.usericon];
  useEffect(() => {
    {
      props.styles ? style.push(props.styles) : null;
    }
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    fetch(PROTOCOL + "://" + HOST + "/api/checkauth")
      .then((res) => res.json())
      .then((data) => {
        if (data.result == "Success") {
          setUrl("/user");
        } else {
          setUrl("/login");
        }
      });
  }, [isLogged]);
  return (
    <Link href={url}>
      <img
        onClick={props.click}
        className={style.join(" ")}
        src="/header/user.svg"
        alt=""
      />
    </Link>
  );
};

export default UserIcon;
