import Cookies from "cookies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useCart from "../util/useCart";
export async function getServerSideProps({ req, res }) {
  var userlogin = false;
  var cookies = new Cookies(req, res);
  var authToken = cookies.get("auth-token");
  if (authToken != undefined) {
    userlogin = true;
  }
  cookies.set("auth-token");

  return {
    props: {
      log: userlogin,
    },
  };
}
export default function Logout({ log }) {
  const router = useRouter();
  const { isLogged, toggleLogged, setUser, setShipping } = useCart();
  useEffect(() => {
    if (isLogged || log) {
      toggleLogged(false);
      setUser({});
      setShipping({});
      router.push("/login");
    } else {
      router.push("/");
    }
  }, []);
  return <></>;
}
