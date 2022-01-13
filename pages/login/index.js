import Input from "../../components/UI/Input/input";
import styles from "../../styles/login.module.css";
import Form from "../../components/Form/form";
import Submit from "../../components/UI/Button/Submit/submit";
import Link from "next/link";
import Cookies from "cookies";
import { useRouter } from "next/router";
import useCart from "../../util/useCart";
const WithRouterLogin = (props) => {
  const router = useRouter();
  const { toggleLogged, setUser, setShipping } = useCart();
  return (
    <Login
      {...props}
      setShipping={setShipping}
      setUser={setUser}
      toggleLogged={toggleLogged}
      router={router}
    />
  );
};
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "",
        password: "",
      },
      empty: {
        email: false,
        password: false,
      },
    };
  }
  onFocus(e) {
    var obj = { ...this.state };
    obj.empty[e.target.name] = false;
    this.setState({ obj });
  }
  onChange(e) {
    var obj = { ...this.state };
    obj.data[e.target.name] = e.target.value;
    this.setState({ obj });
  }
  onSubmit(e) {
    var err = 0;
    e.preventDefault();
    var HOST = process.env.NEXT_PUBLIC_HOST;
    var PROTOCOL = process.env.NEXT_PUBLIC_PROTOCOL;
    for (const [key, value] of Object.entries(this.state.data)) {
      if (value == "") {
        var obj = { ...this.state };
        obj.empty[key] = true;
        this.setState({ obj });
        err++;
      }
    }
    var formData = new FormData();
    formData.append("email", this.state.data.email);
    formData.append("password", this.state.data.password);
    if (err != 0) {
      return;
    }
    fetch(PROTOCOL + "://" + HOST + "/api/proxy/login", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.result == "Failed") {
          alert("Pokusajte ponovo!");
        } else {
          var user = data.user;
          this.props.setUser(user);
          this.props.setShipping({});
          this.props.toggleLogged(true);
          if (this.props.router.query.back != undefined) {
            this.props.router.push("/checkout/orderdetails");
          } else {
            this.props.router.push("/");
          }
        }
      });
  }
  render() {
    return (
      <div className={styles.body}>
        <div className={styles.login}>
          <form onSubmit={(e) => this.onSubmit(e)}>
            <Form formname="Prijavi se">
              <Input
                onFocus={(e) => this.onFocus(e)}
                onChange={(e) => this.onChange(e)}
                value={this.state.email}
                style={
                  this.state.empty.email
                    ? { borderBottom: "1px solid red" }
                    : {}
                }
                inputtype="input"
                label="E-mail"
                img="/login/email.svg"
                placeholder="mojaadresa@gmail.com"
                name="email"
                type="email"
              ></Input>
              <Input
                onFocus={(e) => this.onFocus(e)}
                onChange={(e) => this.onChange(e)}
                value={this.state.password}
                style={
                  this.state.empty.password
                    ? { borderBottom: "1px solid red" }
                    : {}
                }
                inputtype="input"
                label="Lozinka"
                img="/login/password.svg"
                placeholder="•••••••••••••"
                name="password"
                type="password"
              ></Input>
              <div className={styles.block}>
                <Submit styles={styles.loginbutton}>Prijava</Submit>
              </div>
              <div className={styles.block}>
                <Link href="/login/forgotpassword">
                  <p className={styles.forgotpw}>Zaboravili ste lozinku?</p>
                </Link>
                <p className={styles.registerprvi}>
                  Nemate nalog?{" "}
                  <Link href="/register">
                    <span className={styles.register}> Registrujte se</span>
                  </Link>
                </p>
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
export default WithRouterLogin;
