import React from "react";
import Input from "../../../components/UI/Input/input";
import styles from "../../../styles/login.module.css";
import Form from "../../../components/Form/form";
import Submit from "../../../components/UI/Button/Submit/submit";
import Link from "next/link";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
class ForgotPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        email: "",
      },
      emailEmpty: false,
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
        var obj = { ...this.state };
        obj[key + "Empty"] = true;
        this.setState(obj);
        err++;
      }
    }
    if (err == 0) {
      var formData = new FormData();
      formData.append("email", this.state.data.email);
      var checkmail = fetch(PROTOCOL + "://" + HOST + "/api/checkemail", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result == "Success") {
            var secret = "traktorlandsecret";
            var username = this.state.data.email;
            var token = jwt.sign({ username: username }, secret);

            var url =
              PROTOCOL +
              "://" +
              HOST +
              "/login/forgotpassword/finish?token=" +
              token;

            var formData = new FormData();
            formData.append("email", this.state.data.email);
            formData.append("url", url);

            fetch(PROTOCOL + "://" + HOST + "/api/sendmail", {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.result == "Success") {
                  alert("Check mail");
                } else {
                  alert("Error");
                }
              });
          } else {
            alert("Email ne postoji u bazi");
          }
        });
    }
  }
  render() {
    return (
      <div className={styles.body}>
        <div className={styles.login}>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <Form formname="Zaboravljena lozinka">
              <Input
                onFocus={(e) => this.onFocus(e)}
                style={
                  this.state.emailEmpty ? { borderBottom: "1px solid red" } : {}
                }
                onChange={(e) => this.onChange(e)}
                value={this.state.data.email}
                inputtype="input"
                label="E-mail"
                img="/login/email.svg"
                placeholder="mojaadresa@gmail.com"
                name="email"
                type="email"
              ></Input>
              <div className={styles.block}>
                <Submit styles={styles.loginbutton}>Pošalji</Submit>
              </div>
              <div className={styles.block}>
                <Link href="/login/">
                  <p className={styles.forgotpw}>Nazad na prijavu</p>
                </Link>
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
  return {
    props: {},
  };
}
export default ForgotPass;
