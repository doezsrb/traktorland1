import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";

import Link from "next/link";
import styles from "../../styles/webshop.module.css";
import Products from "../../components/products/products";
import Cookies from "cookies";
var offset = 0;
var loading = false;
var search4code = "";
var tip4code = "";
var sub4code = "";
var kolona4code = "";
var disScroll = false;
var lastScroll = 0;
function Search(props) {
  const router = useRouter();
  const testRef = useRef();
  var naslov = "";
  const [searchValue, setSearchValue] = useState(props.searchValue);
  const [data, setData] = useState([]);
  useEffect(() => {
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    fetch(
      PROTOCOL +
        "://" +
        HOST +
        "/api/search?search=" +
        props.param +
        "&offset=" +
        offset +
        "&limit=40"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.results);
        window.addEventListener("scroll", scrollFunc);
      });
    return () => {
      fetch(PROTOCOL + "://" + HOST + "/api/search?resetglobal=true");
      window.removeEventListener("scroll", scrollFunc);
    };
  }, []);

  function scrollFunc(event) {
    var { offsetTop, offsetHeight } = testRef.current;
    var scrollTrig = offsetHeight - offsetTop;

    if (window.scrollY < lastScroll) {
      return;
    }

    if (disScroll) {
      return;
    }

    var scrollMaxY =
      window.scrollMaxY ||
      document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;

    if (window.scrollY > scrollTrig) {
      if (!loading) {
        offset += 40;
        loading = true;

        fetch(
          PROTOCOL +
            "://" +
            HOST +
            "/api/search?search=" +
            searchValue +
            "&offset=" +
            offset +
            "&limit=40"
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.results.length == 0) {
              disScroll = true;
            }
            setData((prevData) => prevData.concat(data.results));
            setTimeout(() => {
              loading = false;
            }, 1000);
          });
      }
    }

    lastScroll = window.scrollY;
  }
  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Link href="/webshop">
          <h1 className={styles.naslov}>{"<- WEBSHOP"}</h1>
        </Link>
        <h3 className={styles.naslovmanji}>{naslov}</h3>
        <div className={styles.line}></div>
        <div ref={testRef}>
          <Products
            user={props.user}
            search={props.search}
            backroute={props.param}
            data={data}
            mdata={props.mData}
          />
        </div>
      </div>
    </div>
  );
}
export async function getServerSideProps(context) {
  var HOST = process.env.HOST;
  var PROTOCOL = process.env.PROTOCOL;
  var offset = 0;

  var email = "";
  var online = true;

  var cookies = new Cookies(context.req, context.res);
  var authToken = cookies.get("auth-token");
  if (authToken == undefined) {
    online = false;
  }
  if (online) {
    await fetch(PROTOCOL + "://" + HOST + "/api/checkauth", {
      headers: { "auth-token": authToken },
    })
      .then((res) => res.json())
      .then((data) => {
        email = data.email;
      });
    var user = await fetch(PROTOCOL + "://" + HOST + "/api/getuser", {
      method: "POST",
      body: JSON.stringify({ email: email }),
    })
      .then((res) => res.json())
      .then((data) => data.user);
  } else {
    var user = {};
  }

  return {
    props: {
      mData: "empty",
      param: context.query.search,
      search: "true",
      searchValue: context.query.search,
      user: user,
    },
  };
}
export default Search;
