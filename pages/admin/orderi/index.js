import styles from "./proizvodi.module.css";
import Orderi from "../../../components/Admin/Orderi/orderi";
import { useState, useEffect } from "react";
import Cookies from "cookies";
import Filter from "../../../components/Search/Filter/filter";
import Menu from "../../../components/UI/HamburgerMenu/hamburger";

export async function getServerSideProps({ req, res }) {
  var offset = 0;
  var HOST = process.env.HOST;
  var PROTOCOL = process.env.PROTOCOL;
  var user = "";
  var email = "";
  var cookies = new Cookies(req, res);
  var authToken = cookies.get("auth-token");
  if (authToken == undefined) {
    res.writeHead(307, { Location: "/login" });
    res.end();
  }
  await fetch(PROTOCOL + "://" + HOST + "/api/checkauth", {
    headers: { "auth-token": authToken },
  })
    .then((res) => res.json())
    .then((data) => {
      email = data.email;
    });

  await fetch(PROTOCOL + "://" + HOST + "/api/getuser", {
    method: "POST",
    body: JSON.stringify({ email: email }),
  })
    .then((res) => res.json())
    .then((data) => {
      user = data.user;
    });
  if (user.partnertype !== "admin") {
    res.writeHead(307, { Location: "/login" });
    res.end();
  }

  //----------------------------------------------------

  return {
    props: {
      data: [],
    },
  };
}

var loading = false;
var search4code = "";
var tip4code = "";
var sub4code = "";
var kolona4code = "";
var offset = 0;
var disScroll = false;
var lastScroll = 0;
const proizvodi = ({ data }, props) => {
  const [orderdata, setOrderdata] = useState(data);
  const [noviColor, setNoviColor] = useState("");
  const [zavrseniColor, setZavrseniColor] = useState("");
  const [tip, setTip] = useState("novi");
  const [searchValue, setSearchValue] = useState("");
  var HOST = process.env.NEXT_PUBLIC_HOST;
  var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;

  useEffect(() => {
    window.addEventListener("scroll", scrollFunc);
    return () => {
      window.removeEventListener("scroll", scrollFunc);
    };
  }, []);
  useEffect(() => {
    tip4code = tip;
    refreshData();
  }, [tip]);
  useEffect(() => {
    search4code = searchValue;
  }, [searchValue]);
  function scrollFunc(event) {
    // var {offsetTop,offsetHeight} = testRef.current
    // var scrollTrig = offsetHeight-offsetTop;

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

    if (window.scrollY > scrollMaxY - 20) {
      if (!loading) {
        offset += 40;
        loading = true;
        if (search4code == "") {
          if (tip4code == "novi") {
            fetch(
              PROTOCOL +
                "://" +
                HOST +
                "/api/getorders?zavrseni=0&offset=" +
                offset
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.length == 0) {
                  disScroll = true;
                }
                setOrderdata((prevData) => prevData.concat(data));
                setTimeout(() => {
                  loading = false;
                }, 1000);
              });
          } else {
            fetch(
              PROTOCOL +
                "://" +
                HOST +
                "/api/getorders?zavrseni=1&offset=" +
                offset
            )
              .then((res) => res.json())
              .then((data) => {
                if (data.length == 0) {
                  disScroll = true;
                }
                setOrderdata((prevData) => prevData.concat(data));
                setTimeout(() => {
                  loading = false;
                }, 1000);
              });
          }
        } else {
          fetch(
            PROTOCOL +
              "://" +
              HOST +
              "/api/searchorder?search=" +
              searchValue +
              "&tip=" +
              tip4code +
              "&offset=" +
              offset
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.results.length == 0) {
                disScroll = true;
              }
              setOrderdata((prevData) => prevData.concat(data.results));
              setTimeout(() => {
                loading = false;
              }, 1000);
            });
        }
      }
    }

    lastScroll = window.scrollY;
  }

  function refreshData() {
    offset = 0;
    disScroll = false;
    lastScroll = 0;
    if (search4code == "") {
      if (tip == "novi") {
        fetch(
          PROTOCOL + "://" + HOST + "/api/getorders?zavrseni=0&offset=" + offset
        )
          .then((res) => res.json())
          .then((data) => setOrderdata(data));
      } else {
        fetch(
          PROTOCOL + "://" + HOST + "/api/getorders?zavrseni=1&offset=" + offset
        )
          .then((res) => res.json())
          .then((data) => setOrderdata(data));
      }
    } else {
      fetch(
        PROTOCOL +
          "://" +
          HOST +
          "/api/searchorder?search=" +
          search4code +
          "&tip=" +
          tip +
          "&offset=" +
          offset
      )
        .then((res) => res.json())
        .then((data) => {
          setOrderdata(data.results);
        });
    }
  }
  function setNovi() {
    //  fetch(PROTOCOL+'://'+HOST+'/api/getorders?zavrseni=0').then(res => res.json())
    // .then(data => setOrderdata(data))
    setNoviColor("#F54343");
    setZavrseniColor("#2B2B2B");
    setTip("novi");
  }
  function setZavrseni() {
    //  fetch(PROTOCOL+'://'+HOST+'/api/getorders?zavrseni=1').then(res => res.json())
    // .then(data => setOrderdata(data))
    setZavrseniColor("#F54343");
    setNoviColor("#2B2B2B");
    setTip("zavrseni");
  }
  function onChange(e) {
    offset = 0;
    disScroll = false;
    lastScroll = 0;
    setSearchValue(e.target.value);
    fetch(
      PROTOCOL +
        "://" +
        HOST +
        "/api/searchorder?search=" +
        e.target.value +
        "&tip=" +
        tip +
        "&offset=" +
        offset
    )
      .then((res) => res.json())
      .then((data) => {
        setOrderdata(data.results);
      });
  }
  return (
    <div className={styles.proizvodi}>
      <div className={styles.heading}>
        <h3>Orderi</h3>
        <button
          onClick={setNovi}
          className={styles.novi}
          style={{ color: noviColor }}
        >
          Novi
        </button>
        <button
          onClick={setZavrseni}
          className={styles.zavrseni}
          style={{ color: zavrseniColor }}
        >
          Zavrseni
        </button>
        <Filter
          change={(e) => onChange(e)}
          placeholder="Pretrazi ordere..."
        ></Filter>
      </div>
      <Orderi orders={orderdata} />
    </div>
  );
};

export default proizvodi;
