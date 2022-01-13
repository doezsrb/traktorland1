import React from "react";
import styles from "./proizvodi.module.css";
import Korisnici from "../../../components/Admin/Korisnici/index";
import { useState, useEffect } from "react";
import Cookies from "cookies";
import Filter from "../../../components/Search/Filter/filter";

export async function getServerSideProps({ req, res }) {
  var HOST = process.env.HOST;
  var PROTOCOL = process.env.PROTOCOL;
  var user = "";
  var email = "";
  var cookies = new Cookies(req, res);
  var authToken = cookies.get("auth-token");
  var offset = 0;
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

  const users = await fetch(
    PROTOCOL + "://" + HOST + "/api/getuser?offset=" + offset
  )
    .then((res) => res.json())
    .then((data) => data);

  return {
    props: {
      data: users,
    },
  };
}
var offset = 0;
var loading = false;
var search4code = "";
var tip4code = "";
var sub4code = "";
var kolona4code = "";
var disScroll = false;
var lastScroll = 0;
const proizvodi = (props) => {
  var HOST = process.env.NEXT_PUBLIC_HOST;
  var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
  const [users, setUsers] = useState(props.data.users);
  const [searchValue, setSearchValue] = useState("");
  useEffect(() => {
    search4code = searchValue;
  }, [searchValue]);
  useEffect(() => {
    window.addEventListener("scroll", scrollFunc);
    return () => {
      window.removeEventListener("scroll", scrollFunc);
    };
  }, []);
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
          fetch(PROTOCOL + "://" + HOST + "/api/getuser?offset=" + offset)
            .then((res) => res.json())
            .then((data) => {
              if (data.users.length == 0) {
                disScroll = true;
              }
              setUsers((prevData) => prevData.concat(data.users));
              setTimeout(() => {
                loading = false;
              }, 1000);
            });
        } else {
          fetch(
            PROTOCOL +
              "://" +
              HOST +
              "/api/searchusers?search=" +
              search4code +
              "&offset=" +
              offset
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.results.length == 0) {
                disScroll = true;
              }
              setUsers((prevData) => prevData.concat(data.results));
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
    fetch(PROTOCOL + "://" + HOST + "/api/getuser?offset=" + offset)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
      });
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
        "/api/searchusers?search=" +
        e.target.value +
        "&offset=" +
        offset
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
      });
  }
  return (
    <>
      <div className={styles.proizvodi}>
        <div className={styles.heading}>
          <h3>Korisnici</h3>
          <Filter
            change={(e) => onChange(e)}
            placeholder="Pretrazi korisnike..."
          ></Filter>
        </div>
        <Korisnici deletefunc={refreshData} users={users} />
      </div>
    </>
  );
};

export default proizvodi;
