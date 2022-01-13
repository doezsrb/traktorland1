import React from "react";
import Input from "../../../components/UI/Input/input";
import styles from "../../../styles/login.module.css";
import Form from "../../../components/Form/form";
import Submit from "../../../components/UI/Button/Submit/submit";
import Link from "next/link";
import Cookies from "cookies";
import { useRouter } from "next/router";
import url from "url";
import jwt from "jsonwebtoken";
const WithRouterForgot = (props) => {
  const router = useRouter();
  return <FinishForgot {...props} router={router} />;
};
class FinishForgot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        lozinka: "",
        potvrditelozinku: "",
      },
      lozinkaEmpty: false,
      potvrditelozinkuEmpty: false,
    };
  }
  onFocus(e) {
    var obj = { ...this.state };
    var key = e.target.name;
    obj[key + "Empty"] = false;
    this.setState(obj);
  }
  onChange(e) {
    var obj = { ...this.state };
    obj.data[e.target.name] = e.target.value;
    this.setState({ obj });
  }
  onSubmit(e) {
    e.preventDefault();
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    var err = 0;
    for (const [key, value] of Object.entries(this.state.data)) {
      if (value == "") {
        this.setState((state, props) => {
          var obj = { ...state };
          obj[key + "Empty"] = true;
          return obj;
        });
        err++;
      }
    }
    if (this.state.data.lozinka !== this.state.data.potvrditelozinku) {
      this.setState({ lozinkaEmpty: true });
      this.setState({ potvrditelozinkuEmpty: true });
      err++;
    }
    var lozinka = this.state.data.lozinka;
    if (lozinka.length < 6) {
      this.setState({ lozinkaEmpty: true });
      err++;
    }
    if (err != 0) {
      return;
    }
    var formData = new FormData();
    formData.append("email", this.props.email);
    formData.append("password", this.state.data.lozinka);
    fetch(PROTOCOL + "://" + HOST + "/api/changepassword", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result == "Success") {
          alert("Sifra je uspesno promenjena");
          this.props.router.push("/login");
        } else {
          alert("Error");
        }
      });
  }
  render() {
    return (
      <div className={styles.body}>
        <div className={styles.login}>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <Form formname="">
              <Input
                onFocus={(e) => this.onFocus(e)}
                onChange={(e) => this.onChange(e)}
                value={this.state.lozinka}
                style={
                  this.state.lozinkaEmpty
                    ? { borderBottom: "1px solid red" }
                    : {}
                }
                inputtype="input"
                label="Lozinka"
                img="/login/password.png"
                placeholder="Vise od 5 karaktera"
                name="lozinka"
                type="password"
              ></Input>
              <Input
                onFocus={(e) => this.onFocus(e)}
                onChange={(e) => this.onChange(e)}
                value={this.state.potvrditelozinku}
                style={
                  this.state.potvrditelozinkuEmpty
                    ? { borderBottom: "1px solid red" }
                    : {}
                }
                inputtype="input"
                label="Potvrdite lozinku"
                img="/login/password.png"
                placeholder="Vise od 5 karaktera"
                name="potvrditelozinku"
                type="password"
              ></Input>
              <div className={styles.block}>
                <Submit styles={styles.loginbutton}>Promeni šifru</Submit>
              </div>
            </Form>
          </form>
        </div>
      </div>
    );
  }
}
export async function getServerSideProps({ req, res }) {
  var cookies = new Cookies(req, res);
  var authToken = cookies.get("auth-token");

  if (authToken != undefined) {
    res.writeHead(307, { Location: "/" });
    res.end();
  }
  var url_parts = url.parse(req.url, true);
  var token = url_parts.query.token;
  var email = "";
  jwt.verify(token, "traktorlandsecret", function (err, decoded) {
    if (err) {
      res.writeHead(307, { Location: "/" });
      res.end();
    } else {
      email = decoded.username;
    }
  });

  return {
    props: {
      email: email,
    },
  };
}
export default WithRouterForgot;
