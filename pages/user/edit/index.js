import { useState } from "react";
import Input from "../../../components/UI/Input/input";
import styles from "../../../styles/login.module.css";
import Form from "../../../components/Form/form";
import Submit from "../../../components/UI/Button/Submit/submit";
import Link from "next/link";
import Cookies from "cookies";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      pravnaLica: this.props.user.pravno_lice,
      user: this.props.user,
      data: {
        ime: this.props.user.name,
        naziv_firme: this.props.user.naziv_firme,
        pib: this.props.user.code,
        telefon: this.props.user.phone,
        email: this.props.user.email,
        adresa: this.props.user.address,
        grad: this.props.user.city,
        postanskibroj: this.props.user.zip,
      },
      empty: {
        imeEmpty: false,
        naziv_firmeEmpty: false,
        pibEmpty: false,
        telefonEmpty: false,
        emailEmpty: false,
        adresaEmpty: false,
        gradEmpty: false,
        postanskibrojEmpty: false,
      },
    };
  }
  onChange(e) {
    var name = e.target.name;
    var obj = { ...this.state };
    obj.data[e.target.name] = e.target.value;
    this.setState(obj);
  }
  onFocus(e) {
    var obj = { ...this.state };
    var key = e.target.name;
    obj.empty[key + "Empty"] = false;
    this.setState(obj);
  }
  onSubmit(e) {
    e.preventDefault();
    var err = 0;
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    for (const [key, value] of Object.entries(this.state.data)) {
      if (value == "") {
        if (this.state.pravnaLica) {
          this.setState((state, props) => {
            var obj = { ...this.state };
            obj.empty[key + "Empty"] = true;
            this.setState(obj);
            err++;
          });
          err++;
        } else {
          if (key == "naziv_firme" || key == "pib") {
          } else {
            var obj = { ...this.state };
            obj.empty[key + "Empty"] = true;
            this.setState(obj);
            err++;
          }
        }
      }
    }

    if (err != 0) {
      return;
    }

    if (this.state.user.email != this.state.data.email) {
      var formData = new FormData();
      formData.append("email", this.state.data.email);
      fetch(PROTOCOL + "://" + HOST + "/api/checkemail", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result == "Success") {
            alert("Email vec postoji u bazi");
            return;
          } else {
            var formData = new FormData();
            formData.append("ime", this.state.data.ime);
            formData.append("prezime", this.state.data.prezime);
            formData.append("telefon", this.state.data.telefon);
            formData.append("email", this.state.data.email);
            formData.append("adresa", this.state.data.adresa);
            formData.append("grad", this.state.data.grad);
            formData.append("postanskibroj", this.state.data.postanskibroj);
            formData.append("oldemail", this.state.user.email);

            if (this.state.pravnaLica) {
              formData.append("naziv_firme", this.state.data.naziv_firme);
              formData.append("pib", this.state.data.pib);
            }

            fetch(PROTOCOL + "://" + HOST + "/api/edituser", {
              method: "POST",
              body: formData,
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.result == "Success") {
                  alert("Sacuvano");
                }
              });
          }
        });
    } else {
      var formData = new FormData();
      formData.append("ime", this.state.data.ime);
      formData.append("prezime", this.state.data.prezime);
      formData.append("telefon", this.state.data.telefon);
      formData.append("email", this.state.data.email);
      formData.append("adresa", this.state.data.adresa);
      formData.append("grad", this.state.data.grad);
      formData.append("postanskibroj", this.state.data.postanskibroj);
      formData.append("oldemail", this.state.user.email);

      if (this.state.pravnaLica) {
        formData.append("naziv_firme", this.state.data.naziv_firme);
        formData.append("pib", this.state.data.pib);
      }

      fetch(PROTOCOL + "://" + HOST + "/api/edituser", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.result == "Success") {
            alert("Sacuvano");
          }
        });
    }
  }
  render() {
    return (
      <div className={styles.body}>
        <div className={styles.login}>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <Form formname="Uredi profil">
              <Input
                onFocus={(e) => this.onFocus(e)}
                onChange={(e) => this.onChange(e)}
                value={this.state.data.ime}
                style={
                  this.state.empty.imeEmpty
                    ? { borderBottom: "1px solid red" }
                    : {}
                }
                inputtype="input"
                requiered
                label="Ime"
                placeholder="npr. Petar"
                name="ime"
                type="text"
              ></Input>

              {this.state.pravnaLica ? (
                <>
                  <Input
                    onFocus={(e) => this.onFocus(e)}
                    onChange={(e) => this.onChange(e)}
                    style={
                      this.state.empty.naziv_firmeEmpty
                        ? { borderBottom: "1px solid red" }
                        : {}
                    }
                    value={this.state.data.naziv_firme}
                    inputtype="input"
                    requiered
                    label="Naziv firme"
                    placeholder="npr. Petrovic DOO"
                    name="naziv_firme"
                    type="text"
                  ></Input>
                  <Input
                    onFocus={(e) => this.onFocus(e)}
                    onChange={(e) => this.onChange(e)}
                    value={this.state.data.pib}
                    style={
                      this.state.empty.pibEmpty
                        ? { borderBottom: "1px solid red" }
                        : {}
                    }
                    inputtype="input"
                    requiered
                    label="PIB"
                    placeholder="npr. 123456"
                    name="pib"
                    type="text"
                  ></Input>
                </>
              ) : null}

              <Input
                onFocus={(e) => this.onFocus(e)}
                onChange={(e) => this.onChange(e)}
                value={this.state.data.telefon}
                style={
                  this.state.empty.telefonEmpty
                    ? { borderBottom: "1px solid red" }
                    : {}
                }
                inputtype="input"
                requiered
                label="Telefon"
                placeholder="npr. 060/123/45-67"
                name="telefon"
                type="text"
              ></Input>
              <Input
                onFocus={(e) => this.onFocus(e)}
                onChange={(e) => this.onChange(e)}
                value={this.state.data.email}
                style={
                  this.state.empty.emailEmpty
                    ? { borderBottom: "1px solid red" }
                    : {}
                }
                inputtype="input"
                requiered
                label="E-mail"
                placeholder="npr. vasaadresa@gmail.com"
                name="email"
                type="email"
              ></Input>
              <div className={styles.line}></div>
              <Input
                onFocus={(e) => this.onFocus(e)}
                onChange={(e) => this.onChange(e)}
                value={this.state.data.adresa}
                style={
                  this.state.empty.adresaEmpty
                    ? { borderBottom: "1px solid red" }
                    : {}
                }
                inputtype="input"
                requiered
                label="Adresa"
                placeholder="npr. Cara Dusana 26"
                name="adresa"
                type="text"
              ></Input>
              <Input
                onFocus={(e) => this.onFocus(e)}
                onChange={(e) => this.onChange(e)}
                value={this.state.data.grad}
                style={
                  this.state.empty.gradEmpty
                    ? { borderBottom: "1px solid red" }
                    : {}
                }
                inputtype="input"
                requiered
                label="Grad"
                placeholder="npr. Beograd"
                name="grad"
                type="text"
              ></Input>
              <Input
                onFocus={(e) => this.onFocus(e)}
                onChange={(e) => this.onChange(e)}
                value={this.state.data.postanskibroj}
                style={
                  this.state.empty.postanskibrojEmpty
                    ? { borderBottom: "1px solid red" }
                    : {}
                }
                inputtype="input"
                requiered
                label="Postanski br."
                placeholder="npr. 11000"
                name="postanskibroj"
                type="text"
              ></Input>

              <div className={styles.block}>
                <Submit styles={styles.loginbutton}>Sacuvaj promene</Submit>
              </div>
            </Form>
          </form>
        </div>
      </div>
    );
  }
}
export async function getServerSideProps({ req, res }) {
  var HOST = process.env.HOST;
  var PROTOCOL = process.env.PROTOCOL;
  var user = "";
  var email = "";
  var cookies = new Cookies(req, res);
  var authToken = cookies.get("auth-token");
  if (authToken == undefined) {
    res.writeHead(307, { Location: "/" });
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

  return {
    props: {
      user: user,
    },
  };
}
export default Edit;
