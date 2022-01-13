import { useState } from "react";
import Input from "../../components/UI/Input/input";
import styles from "../../styles/login.module.css";
import Form from "../../components/Form/form";
import Submit from "../../components/UI/Button/Submit/submit";
import Link from "next/link";
import { useRouter } from "next/router";

const WithRouterRegister = (props) => {
  const router = useRouter();
  return <Register {...props} router={router} />;
};
class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: false,
      pravnaLica: false,
      data: {
        ime: "",
        prezime: "",
        naziv_firme: "",
        pib: "",
        telefon: "",
        email: "",
        adresa: "",
        grad: "",
        postanskibroj: "",
        lozinka: "",
        potvrditelozinku: "",
      },
      empty: {
        imeEmpty: false,
        prezimeEmpty: false,
        naziv_firmeEmpty: false,
        pibEmpty: false,
        telefonEmpty: false,
        emailEmpty: false,
        adresaEmpty: false,
        gradEmpty: false,
        postanskibrojEmpty: false,
        lozinkaEmpty: false,
        potvrditelozinkuEmpty: false,
      },
    };
  }
  formTypeHandler(type) {
    if (type == "fizicko") {
      this.setState({ showForm: true });
      this.setState({ pravnaLica: false });
      var empty = { ...this.state };
      empty.empty = {
        imeEmpty: false,
        prezimeEmpty: false,
        naziv_firmeEmpty: false,
        pibEmpty: false,
        telefonEmpty: false,
        emailEmpty: false,
        adresaEmpty: false,
        gradEmpty: false,
        postanskibrojEmpty: false,
        lozinkaEmpty: false,
        potvrditelozinkuEmpty: false,
      };
      this.setState({ empty });
    } else {
      this.setState({ showForm: true });
      this.setState({ pravnaLica: true });
      var empty = { ...this.state };
      empty.empty = {
        imeEmpty: false,
        prezimeEmpty: false,
        naziv_firmeEmpty: false,
        pibEmpty: false,
        telefonEmpty: false,
        emailEmpty: false,
        adresaEmpty: false,
        gradEmpty: false,
        postanskibrojEmpty: false,
        lozinkaEmpty: false,
        potvrditelozinkuEmpty: false,
      };
      this.setState({ empty });
    }
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
    this.setState({ obj });
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
            this.setState({ obj });
            err++;
          });
          err++;
        } else {
          if (key == "naziv_firme" || key == "pib") {
          } else {
            var obj = { ...this.state };
            obj.empty[key + "Empty"] = true;
            this.setState({ obj });
            err++;
          }
        }
      }
    }
    if (this.state.data.lozinka !== this.state.data.potvrditelozinku) {
      var obj = { ...this.state };
      obj.empty["lozinkaEmpty"] = true;
      obj.empty["potvrditelozinkuEmpty"] = true;

      this.setState({ obj });
      err++;
    }
    if (this.state.data.lozinka < 6) {
      var obj = { ...this.state };
      obj.empty["lozinkaEmpty"] = true;
      obj.empty["potvrditelozinkuEmpty"] = true;

      this.setState({ obj });
      err++;
    }

    if (err != 0) {
      return;
    }

    var formData = new FormData();
    formData.append("ime", this.state.data.ime);
    formData.append("prezime", this.state.data.prezime);
    formData.append("telefon", this.state.data.telefon);
    formData.append("email", this.state.data.email);
    formData.append("adresa", this.state.data.adresa);
    formData.append("grad", this.state.data.grad);
    formData.append("postanskibroj", this.state.data.postanskibroj);
    formData.append("lozinka", this.state.data.lozinka);
    if (this.state.pravnaLica) {
      formData.append("naziv_firme", this.state.data.naziv_firme);
      formData.append("pib", this.state.data.pib);
    }

    fetch(PROTOCOL + "://" + HOST + "/api/register", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result != "Success") {
          alert("Email postoji u bazi");
        } else {
          var data = { ...this.state };
          data.data = {
            ime: "",
            prezime: "",
            naziv_firme: "",
            pib: "",
            telefon: "",
            email: "",
            adresa: "",
            grad: "",
            postanskibroj: "",
            lozinka: "",
            potvrditelozinku: "",
          };
          this.setState(data);

          alert("Uspesno ste se registrovali");
          if (this.props.router.query.back != undefined) {
            this.props.router.push(
              "/login?back=" + this.props.router.query.back
            );
          } else {
            window.location.href = "/login";
          }
        }
      });
  }

  render() {
    return (
      <div className={styles.body}>
        <div className={styles.login}>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <Form formname="Registruj se">
              <img
                onClick={() => this.formTypeHandler("fizicko")}
                className={styles.choosebutton}
                src={
                  this.state.showForm && !this.state.pravnaLica
                    ? "/register/fl1.svg"
                    : "/register/fl.svg"
                }
                alt=""
              />
              <img
                onClick={() => this.formTypeHandler("pravno")}
                className={styles.choosebutton}
                src={
                  this.state.showForm && this.state.pravnaLica
                    ? "/register/pl1.svg"
                    : "/register/pl.svg"
                }
                alt=""
              />
              {this.state.showForm ? (
                <>
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
                  <Input
                    onFocus={(e) => this.onFocus(e)}
                    onChange={(e) => this.onChange(e)}
                    value={this.state.data.prezime}
                    style={
                      this.state.empty.prezimeEmpty
                        ? { borderBottom: "1px solid red" }
                        : {}
                    }
                    inputtype="input"
                    requiered
                    label="Prezime"
                    placeholder="npr. Petrovic"
                    name="prezime"
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
                        value={this.state.data.imefirme}
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
                  <div className={styles.line}></div>
                  <Input
                    onFocus={(e) => this.onFocus(e)}
                    maxLength="20"
                    onChange={(e) => this.onChange(e)}
                    value={this.state.data.lozinka}
                    style={
                      this.state.empty.lozinkaEmpty
                        ? { borderBottom: "1px solid red" }
                        : {}
                    }
                    inputtype="input"
                    requiered
                    label="Lozinka"
                    placeholder="Vise od 5 karaktera"
                    name="lozinka"
                    type="password"
                  ></Input>
                  <Input
                    onFocus={(e) => this.onFocus(e)}
                    maxLength="20"
                    onChange={(e) => this.onChange(e)}
                    value={this.state.data.potvrditelozinku}
                    style={
                      this.state.empty.potvrditelozinkuEmpty
                        ? { borderBottom: "1px solid red" }
                        : {}
                    }
                    inputtype="input"
                    requiered
                    label="Potvrdite lozinku"
                    placeholder="Vise od 5 karaktera"
                    name="potvrditelozinku"
                    type="password"
                  ></Input>
                  <div className={styles.block}>
                    <Submit styles={styles.loginbutton}>Registruj se</Submit>
                  </div>
                </>
              ) : null}
            </Form>
          </form>
        </div>
      </div>
    );
  }
}

export default WithRouterRegister;
