import React from "react";
import Cookies from "cookies";
export async function getServerSideProps({ req, res }) {
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
  if (user.partnertype != "admin") {
    res.writeHead(307, { Location: "/login" });
    res.end();
  }
  return {
    props: {
      user: user,
    },
  };
}
const admin = () => {
  return "ADMIN";
};

export default admin;
